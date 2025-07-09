import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Between, In, Not, Repository } from 'typeorm';
import { FindCitiesArgs } from 'src/general/city/dto/args/find-cities.arg';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { User } from 'src/security/users/entities/user.entity';
import { Visit } from '../entities/visit.entity';
import { CreateVisitInput } from '../dto/inputs/create-visit.input';
import { UpdateVisitInput } from '../dto/inputs/update-visit.input';
import { FindVisitArgs } from '../dto/args/find-visit.args';
import { ClientService } from '../../client/services/client.service';
import { UsersService } from 'src/security/users/services/users.service';
import { ParameterService } from 'src/general/parameters/service/parameter.service';
import { StatusVisitEnum } from '../emun/visit.emun';
import moment from 'moment';
import { VisitTypeService } from '../../visit-type/service/visit-type.service';
import { MailService } from 'src/general/email/service/email.service';
import { UserTypes } from 'src/security/users/enums/user-type.enum';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { QUERY_VISIT_STATUS_BY_COMENT, QUERY_VISIT_STATUS_BY_DATE } from '../sql/index.sql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, of } from 'rxjs';
import { VisitComentService } from '../../visit-coment/services/visit-coment.service';
import { VisitComentStatusEnum, VisitComentTypeEnum } from '../../visit-coment/emun/visit-coment.emun';
import { findOneVisitInProcessInput, generateWorkedHoursInput } from '../dto/inputs/find-visit-process';
import { UpdateStatusInput } from '../dto/inputs/update-status-visit.dto';
import { VisitComent } from '../../visit-coment/entities/visit-coment.entity';
import { VisitToolVisittService } from '../../tools/tool-visit/service/tool-visit-service';
export const serviceStructure = CrudServiceStructure({
  entityType: Visit,
  createInputType: CreateVisitInput,
  updateInputType: UpdateVisitInput,
  findArgsType: FindVisitArgs,
});

@Injectable()
export class VisitService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly clientService: ClientService,
    private readonly usersService: UsersService,
    private readonly parameterService: ParameterService,
    private readonly visitTypeService: VisitTypeService,
    private readonly mailService: MailService,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => VisitComentService))
    private readonly visitComentService: VisitComentService,
    @Inject(forwardRef(() => VisitToolVisittService))
    private readonly visitToolVisittService: VisitToolVisittService,
    
  ){ super(); }


  async beforeCreate(context:IContext,repository: Repository<Visit>, entity: Visit, createInput: CreateVisitInput): Promise<void> {
    
    if(await this.findActivityNowUser(context, createInput.userId)){
      throw new Error('Ya existe una actividad en proceso')
    }
    entity.status = StatusVisitEnum.initiated
    // entity.client = await this.clientService.findOne(context,createInput.clientId, true);
    entity.user = await this.usersService.findOne(context,createInput.userId, true);
    entity.dateVisit = createInput.dateVisit
    entity.type = await this.visitTypeService.findOne(context,createInput.typeId);
  }
  async beforeUpdate(context: IContext, repository: Repository<Visit>, entity: Visit, updateInput: UpdateVisitInput): Promise<void> {
    if(updateInput.status === entity.status){
      throw new Error(`La actividad ya se encuentra en el estado que estas intentando cambiar [${updateInput.status}]`)
    }
  }
  async calculateTotalHours(visit: Visit): Promise<number> {
    const manager = this.getRepository({user: undefined}).manager
    const startComent = await manager.findOne(VisitComent,{
      where: { 
        visit: {
          id: visit.id
        }, 
        type: VisitComentTypeEnum.INICIO 
      },
    });

    const endComent = await manager.findOne(VisitComent,{
      where: { 
        visit: {
          id: visit.id
        }, 
        type: VisitComentTypeEnum.FIN 
      },
    });

    if (!startComent || !endComent) {
      return 0; // Si falta algún comentario de INICIO o FIN, no podemos calcular las horas
    }

    // Calcular la diferencia entre las fechas en minutos
    const startTime = moment(startComent.dateFull);
    const endTime = moment(endComent.dateFull);
    const durationInMinutes = endTime.diff(startTime, 'minutes');

    // Convertir a horas con una cifra decimal redondeada
    const durationInHours = Math.round((durationInMinutes / 60) * 10) / 10;

    return durationInMinutes;
  }

  // Método para obtener una visita con las horas calculadas
  async getVisitWithTotalHours(userId: string): Promise<number> {
    const visit = await this.getRepository({user: undefined}).find({
      where: { 
        user: {
          id: userId
        } 
      },
      relations: ['visitItem'],
    });

    if (visit) {
      // Calculamos las horas y las asignamos a la propiedad totalHours
      // return await this.calculateTotalHours(visit);
    }

    return 0;
  }
  async afterCreate(context: IContext, repository: Repository<Visit>, entity: Visit, createInput: CreateVisitInput): Promise<void> {
    // const aceptAdminVisit = await this.parameterService.findOneCodigo(context, 'ACEPT-VISIT-EMAIL',true)
    // if(typeof aceptAdminVisit === 'string' && aceptAdminVisit === 'SI'){
    //   await this.sendMailAdmin(context,entity)
    // }
    // if(typeof aceptAdminVisit === 'string' && aceptAdminVisit === "NO"){
    //   entity.status = StatusVisitEnum.confirmed
    //   await repository.save(entity)
    // }
    if (Array.isArray(createInput.tools)) {
      for (const tool of createInput.tools) {
        this.visitToolVisittService.create(context, {
          toolUnitId: tool.toolUnitId,
          visitId: entity.id,
          photoUrls: tool.photoUrls,
          usageDate: new Date(),
        });
      }
    }
    
    const comment = await this.visitComentService.create(context,{
      type: VisitComentTypeEnum.INICIO,
      visitId: entity.id,
      description: entity.description,
      date: entity.dateVisit,
      status: VisitComentStatusEnum.REALIZED,
      latitude: entity.latitude,
      longitude: entity.longitude,
      dateFull: entity.dateVisit,
      time: entity.dateVisit,
      mocked: entity.mocked,
      fileId: createInput.fileId || undefined
    })
    if(entity.mocked){
      this.sendMailMockedFail(context,comment)
    }
  }
  async finishVisit(context: IContext, updateInput: UpdateStatusInput){
    const repository = this.getRepository(context);
    const entity = await this.findOne(context,updateInput.id,true);
    entity.status = StatusVisitEnum.realized
    const responseEntity = await repository.save(entity);
    const comment = await this.visitComentService.create(context,{
      type: VisitComentTypeEnum.FIN,
      visitId: entity.id,
      description: updateInput.description,
      date: updateInput.dateVisit,
      status: VisitComentStatusEnum.REALIZED,
      latitude: updateInput.latitude,
      longitude: updateInput.longitude,
      dateFull: moment(moment(updateInput.dateVisit).format('YYYY-MM-DD HH:mm')).local().toDate(),
      time: updateInput.dateVisit,
      mocked: updateInput.mocked,
      fileId: updateInput.fileId || undefined
    })
    if(updateInput.mocked){
      this.sendMailMockedFail(context,comment)
    }
    return responseEntity
  }
  async sendWhastapp(number: string, entity: Visit){
    try {
      const url = "http://intranet.cytech.net.co:3003/send-message";
      const headers = {
          'Content-Type': 'application/json',
      };
      const status = entity.status == StatusVisitEnum.confirmed ? 'CONFIRMADA' : 'CANCELADA'
      const payload = {
        number: "57" + number,
        message: `Hola ${(await entity.user).name}, su visita para el dia [${moment(entity.dateVisit).format('YYYY-MM-DD HH:mm:ss')}] con el cliente , fue  ${status}`
      }
      const response = await firstValueFrom(this.httpService.post(url, payload, {headers}));
      return true
    } catch (error) {
      return false
    }
  }
  async sendWhastappAdmin(entity: Visit, urlAcept: string, urlRechazar: string){
    try {
      const url = "http://intranet.cytech.net.co:3003/send-message";
      const headers = {
          'Content-Type': 'application/json',
      };
      const status = entity.status == StatusVisitEnum.confirmed ? 'CONFIRMADA' : 'CANCELADA'
      const payload = {
        number: "57" + "3176578598",
        message: `
        El trabajador ${(await entity.user).name}, creo una  visita para el dia [${moment(entity.dateVisit).format('YYYY-MM-DD HH:mm:ss')}] con el cliente, por favor revisar
        \n\n
        Click aquí para aceptar --> [${urlAcept}] \n\n
        Click aquí para rechazar --> [${urlRechazar}] \n\n
        `
      }
      const response = await firstValueFrom(this.httpService.post(url, payload, {headers}));
      return true
    } catch (error) {
      return false
    }
  }
  async sendMailAdmin(context: IContext,visit: Visit){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9c'
    const emailUserConfirm = await this.parameterService.findOneCodigo(context,'EMAIL-CONFIRM-VISIT',true);
    if(typeof emailUserConfirm === 'string'){
      let contextE = {
        userName: (await visit.user).name,
        visitDate: moment(visit.dateVisit).format('YYYY-MM-DD'),
        // clientName: (await visit.client).name,
        // clientAddress: await (visit.client).address || "SIN DIRECCION",
        visitorName: (await visit.user).name,
        statusVisit: visit.status,
        // typeVisit: (await visit.type)?.name,
        urlAcept: process.env.EMAIL_FRONTEND + 'public/confimEmail/confirmed/' + visit.id + '/'+ token,
        urlRech: process.env.EMAIL_FRONTEND + 'public/confimEmail/canceled/' + visit.id + '/'+ token

      }
      await this.mailService.sendMail(emailUserConfirm,"Confirmación de Visita", "aceptOrDecline",contextE)
      const urlAcpet = process.env.EMAIL_FRONTEND + 'public/confimEmail/confirmed/' + visit.id + '/'+ token;
      const urlRech = process.env.EMAIL_FRONTEND + 'public/confimEmail/canceled/' + visit.id + '/'+ token
      this.sendWhastappAdmin(visit,urlAcpet,urlRech)
    }
  }
  async findActivityNowUser(context: IContext, id: string){
    const visits = await this.find(context, {
      where: {
        user: {
          id: id
        },
        status: StatusVisitEnum.initiated
      },
    })
    return visits.length > 0
  }
  async findOneVisitDetail(context: IContext, id: string){
    const visit = await this.find(context, {
      where: {
        id: id
      },
      relations: {  
        
      }
    })

  }
  async sendMail(context: IContext, entity: Visit){
    if(entity.status == StatusVisitEnum.confirmed){
      let contextE = {
        userName: (await entity.user).name,
        visitDate: moment(entity.dateVisit).format('YYYY-MM-DD'),
        visitorName: (await entity.user).name,
        statusVisit: entity.status,
        comment: entity.status
      }
      await this.mailService.sendMail((await entity.user).email,"Visita Confirmada", "confirm",contextE)
    }
  }
  async sendMailMockedFail(context: IContext, entity: VisitComent){
    let contextE = {
      userName: (await entity.user).name,
      visitDate: moment(entity.createdAt).format('YYYY-MM-DD'),
      comment: entity.description,
      latitude: entity.latitude,
      longitude: entity.longitude
    }
    await this.mailService.sendMail('andresmolinag2018@gmail.com',"Alerta: Ubicación Incorrecta Reportada", "locationMocked",contextE)
  }
  async findAllVisitDashboard(context: IContext){
    const earrings = await this.find(context, {
      where: {
        status: In([StatusVisitEnum.confirmed,StatusVisitEnum.reprogrammed]), 
        user: {
          id: context.user.id
        }
      },
      order: {
        dateVisit: 'DESC'
      },
      take: 5
    });
    const realized = await this.find(context, {
      where: {
        status: StatusVisitEnum.realized, 
      },
      order: {
        dateVisit: 'DESC'
      },
      take: 5
    });
    return {
      earrings,
      realized
    }
  }
  async acceptOrDeclineVisit(context: IContext, id: string, status: StatusVisitEnum ){
    const visita = await this.findOne(context,id);
    if(!visita){
      throw new Error("NO EXISTE EL ID DE LA VISITA")
    }

    if(visita.status == StatusVisitEnum.canceled)  throw new Error("ESTA VISITA YA FUE CANCELADA")
    if(visita.status == StatusVisitEnum.confirmed) throw new Error("ESTA VISITA YA FUE CONFIRMADA")
    if(visita.status == StatusVisitEnum.realized) throw new Error("ESTA VISITA YA FUE RELIZADA")

    await this.update(context,id, {id,status: status})
    const number  = (await visita.user).phoneNumber
    this.sendWhastapp(number,visita)
    this.sendMail(context,visita)
    return "VISITA CONFIRMADA CON EXITO"

  }
  async countStatusVisitByDate(context: IContext, dateInit: string, dateFinis: string,res: Response){
    const repository = this.getRepository(context)
    const sql = QUERY_VISIT_STATUS_BY_DATE(dateInit,dateFinis)
    const datos = await repository.manager.query(sql)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    worksheet.columns = [
      { header: 'Trabajador', key: 'trabajador', width: 30 },
      { header: 'Total Programadas', key: 'totalProgramadas', width: 20 },
      { header: 'Total Realizadas', key: 'totalRealizadas', width: 20 },
      { header: 'Total Cancelada', key: 'totalCancelada', width: 20 },
      { header: 'Total Confirmada', key: 'totalConfirmada', width: 20 },
      { header: 'Total Visitas', key: 'totalVisitas', width: 15 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.style = {
        font: { bold: true, color: { argb: 'FFFFFFFF' } },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF808080' }, // Gris
        },
      };
    });

    datos.forEach(dato => {
      worksheet.addRow({
        userId: dato.userId,
        trabajador: dato.trabajador,
        totalVisitas: dato.totalVisitas,
        totalProgramadas: dato.totalProgramadas,
        totalRealizadas: dato.totalRealizadas,
        totalCancelada: dato.totalCancelada,
        totalConfirmada: dato.totalConfirmada,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=reporte-${Date.now()}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  }
  async countStatusVisitStatistic(context: IContext, dateInit: string, dateFinis: string){
    const repository = this.getRepository(context)
    const sql = QUERY_VISIT_STATUS_BY_DATE(dateInit,dateFinis)
    const datos = await repository.manager.query(sql)
    const minimiVisit = await this.parameterService.findOneCodigo(context,'MIN-VISIT-MONTH', true);
    const response = datos?.map((x)=> {
      return {
        name: x.trabajador,
        totalVisitas: x.totalVisitas,
        totalProgramadas: x.totalProgramadas,
        totalRealizadas: x.totalRealizadas,
        totalCancelada: x.totalCancelada,
        totalConfirmada: x.totalConfirmada,
        minimiVisit: +minimiVisit
      }
    })
    return response
  }
  async countStatusVisitComentStatic(context: IContext,dateInit: string, dateFinis: string) {
    const repository = this.getRepository(context)
    const sql = QUERY_VISIT_STATUS_BY_COMENT(dateInit,dateFinis)
    const datos = await repository.manager.query(sql)
    const response = datos?.map((x)=> {
      return {
        name: x.trabajador,
        totalComentarios: x.totalComentarios,
        totalPendientes: x.totalPendientes,
        totalRealizadas: x.totalRealizadas,
        totalCancelada: x.totalCancelada,
      }
    })
    return response
  }
  async commisionDataUser(){
  try {
    const response = await firstValueFrom(this.httpService.get('http://localhost:3004/some/POGRESO_DE_VENTAS'));
    return response.data

  }catch(err){
    return new BadRequestException(err.message)
  }
  }
  async generateWorkedHours(input: generateWorkedHoursInput): Promise<VisitComent[]> {
    const repo = this.getRepository({ user: undefined }).manager.getRepository(VisitComent);

    const comments = await repo.find({
      where: {
        date: Between(moment(input.fechaInicio).startOf('day').toDate(), moment(input.fechaFinal).endOf('day').toDate()),
        visit: {
          status: StatusVisitEnum.realized,
          ...(input.typeId ? { type: { id: input.typeId } } : {}), // Filtra por tipo de visita si aplica
          ...(input.userId ? { user: { id: input.userId } } : {}), // Filtra por usuario de la visita si aplica
        }
      },
      relations: ['user', 'visit'],
      order: { date: 'ASC', time: 'ASC' },
    });
    return comments
  }
async generateWorkedHoursExcel(fechaInicio: Date, fechaFin: Date, res: Response, userId?: string, typeId?: string): Promise<void> {
  const repo = this.getRepository({ user: undefined }).manager.getRepository(VisitComent);

  const comments = await repo.find({
    where: {
      date: Between(fechaInicio, fechaFin),
      visit: {
        status: StatusVisitEnum.realized,
        ...(typeId ? { type: { id: typeId } } : {}), // Filtra por tipo de visita si aplica
        ...(userId ? { user: { id: userId } } : {}), // Filtra por usuario de la visita si aplica
      }
    },
    relations: ['user', 'visit'],
    order: { date: 'ASC', time: 'ASC' },
  });

  // Agrupar por visita
  const grouped = new Map<string, { user: any; visit: any; type: any; start?: VisitComent; end?: VisitComent }>();

  for (const c of comments) {
    const visit = await c.visit;
    const user = await c.user;
    const type = await visit.type;
    const visitId = visit?.id;

    if (!visitId || !user) continue;

    if (!grouped.has(visitId)) {
      grouped.set(visitId, {
        user: user,
        visit: visit,
        type: type,
        start: undefined,
        end: undefined,
      });
    }

    const entry = grouped.get(visitId);

    if (c.type === VisitComentTypeEnum.INICIO && !entry.start) {
      entry.start = c;
    }

    if (c.type === VisitComentTypeEnum.FIN) {
      entry.end = c; // Se quedará con el último FIN encontrado (por orden ASC)
    }
  }

  // Crear Excel
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Reporte Horas por Visita');

  sheet.addRow(['Usuario', 'Fecha', 'Hora Inicio', 'Hora Fin', 'Total Horas', 'Tipo de visita', 'Descripción Visita']);

  let totalHorasGlobal = 0;

  for (const [, entry] of grouped) {
    const { user, visit, start, end, type } = entry;

    if (!start?.date || !start?.time || !end?.date || !end?.time) continue;
    const startDateTime = moment(`${start.date}T${start.time}`).subtract(5, 'hours');
    const endDateTime = moment(`${end.date}T${end.time}`).subtract(5, 'hours');

    if (!startDateTime.isValid() || !endDateTime.isValid()) continue;

    // Diferencia exacta en milisegundos
    const diffMs = endDateTime.diff(startDateTime);

    // Convertimos a minutos con redondeo de segundos
    let diffMin = Math.floor(diffMs / 60000); // 60000 ms = 1 minuto
    const remainingSeconds = (diffMs % 60000) / 1000;

    if (remainingSeconds >= 30) {
      diffMin += 1;
    }

    const diffHrs = diffMin / 60;
    totalHorasGlobal += diffHrs;

    sheet.addRow([
      `${user.name} ${user.lastName}`,
      start.date,
      start.time,
      end.time,
      diffMin,
      type?.name || '',
      visit.description ?? '',
    ]);
  }

  sheet.addRow([]);
  sheet.addRow(['TOTAL HORAS', '', '', '', totalHorasGlobal.toFixed(2)]);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=ReporteHorasPorVisita_${moment().unix()}.xlsx`);

  await workbook.xlsx.write(res);
  res.end();
}


}
