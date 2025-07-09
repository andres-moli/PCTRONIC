import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { VisitService } from '../../visit/services/visit.service';
import { Fletes } from '../entities/fletes.entity';
import { CreateFletesInput } from '../dto/inputs/create-fletes.input';
import { UpdateFletesInput } from '../dto/inputs/update-fletes.input';
import { FindFletesArgs } from '../dto/args/find-fletes.args';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FacturaPorClienteDto } from '../dto/inputs/find-fletes.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { FacturaResponseModel } from '../dto/model/fletes.module';
import { FletesDocument } from '../entities/documentFletes.entity';
import { FletesWithDocument } from '../dto/model/fletesDcoument.module';
import { InjectRepository } from '@nestjs/typeorm';

export const serviceStructure = CrudServiceStructure({
  entityType: Fletes,
  createInputType: CreateFletesInput,
  updateInputType: UpdateFletesInput,
  findArgsType: FindFletesArgs,
});

@Injectable()
export class FletesService extends CrudServiceFrom(serviceStructure) {
  constructor(
      private readonly httpService: HttpService,
      @InjectRepository(FletesDocument)
      private readonly fleteDocumentReposi: Repository<FletesDocument>
      
  ){ super(); }
  async findAllFacturaCliente(context: IContext, input: FacturaPorClienteDto){
    const payload = JSON.stringify({
      "tem_cedula": input.tem_cedula,
      "tem_nomcli": input.tem_nomcli,
      "tem_fecha_desde": input.tem_fecha_desde,
      "tem_fecha_hasta": input.tem_fecha_hasta,
      "tem_numdoc": input.tem_numdoc,
      "tem_vended": input.tem_vended
    });
    const url = process.env.MICROSERVICE_URL + 'some/facturas_por_cliente';
    const headers = {
        'Content-Type': 'application/json',
    };    

    const response = await firstValueFrom(this.httpService
      .post(url, payload, {
          headers,
      })
    );
    const facturas: FacturaResponseModel[] = response.data;
    const manager = this.getRepository(context).manager
    for (const factura of facturas) {
      // Verificar si existe un registro con el número de documento
      let flete = await manager.findOne(FletesDocument,{
        where: { TEM_NUMDOC: factura.TEM_NUMDOC },
      });

      // Si no existe, creamos un nuevo registro
      if (!flete) {
        // Crear un nuevo registro en la base de datos si no se encuentra un flete existente
        flete = manager.create(FletesDocument, {
          TEM_NUMDOC: factura.TEM_NUMDOC,
          TEM_NOMCLI: factura.TEM_NOMCLI,
          TEM_CEDULA: factura.TEM_CEDULA,
          TEM_FECHA: factura.TEM_FECHA, // Usamos directamente el string de la fecha
          TEM_TIPMOV: factura.TEM_TIPMOV,
          TEM_PREFIJ: factura.TEM_PREFIJ,
          TEM_VENDED: factura.TEM_VENDED,
          TEM_VENTA: factura.TEM_VENTA,
          TEM_VALCOS: factura.TEM_VALCOS,
          TEM_UTILIDAD: factura.TEM_UTILIDAD,
          TEM_PORCENTAJE_UTILIDAD: factura.TEM_PORCENTAJE_UTILIDAD,
          CL_DEPART: factura.CL_DEPART,
          CLI_CIUDAD: factura.CLI_CIUDAD,
        });
      } else {
        // Si existe, actualizamos los campos con los nuevos valores
        flete.TEM_NOMCLI = factura.TEM_NOMCLI;
        flete.TEM_CEDULA = factura.TEM_CEDULA;
        flete.TEM_FECHA = factura.TEM_FECHA; // Usamos directamente el string de la fecha
        flete.TEM_TIPMOV = factura.TEM_TIPMOV;
        flete.TEM_PREFIJ = factura.TEM_PREFIJ;
        flete.TEM_VENDED = factura.TEM_VENDED;
        flete.TEM_VENTA = factura.TEM_VENTA;
        flete.TEM_VALCOS = factura.TEM_VALCOS;
        flete.TEM_UTILIDAD = factura.TEM_UTILIDAD;
        flete.TEM_PORCENTAJE_UTILIDAD = factura.TEM_PORCENTAJE_UTILIDAD;
        flete.CL_DEPART = factura.CL_DEPART;
        flete.CLI_CIUDAD = factura.CLI_CIUDAD;
      }      

      // Guardar el registro en la base de datos (ya sea actualizado o nuevo)
      await manager.save(flete);
    }
    return this.filterFletes(context,input)

  }
  async filterFletes(
    context: IContext,
    input: {
      tem_cedula?: string;
      tem_nomcli?: string;
      tem_fecha_desde?: string;
      tem_fecha_hasta?: string;
      tem_numdoc?: string;
      tem_vended?: string;
    },
  ): Promise<FletesWithDocument[]> {
    const queryBuilder = this.fleteDocumentReposi.createQueryBuilder('t')
    queryBuilder.leftJoin(
      Fletes,
      'td',
      'td.numberDocument = t.TEM_NUMDOC', // INNER JOIN entre t y td basado en TEM_NUMDOC
    );
    queryBuilder.addSelect([
      'td.numberDocument AS "numberDocument"',
      'td.description AS "description"',
      'td.valueFlete AS "valueFlete"',
      'td.oip AS "oip"',
      'td.backComision AS "backComision"',
      'td.numberGuia AS "numberGuia"',
      'td.carrier AS "carrier"',
      'td.carrierCell AS "carrierCell"',
      'td.contactClient AS "contactClient"',
      't.TEM_CEDULA AS "TEM_CEDULA"',
      't.TEM_NOMCLI AS "TEM_NOMCLI"',
      't.TEM_FECHA AS "TEM_FECHA"',
      't.TEM_TIPMOV AS "TEM_TIPMOV"',
      't.TEM_PREFIJ AS "TEM_PREFIJ"',
      't.TEM_NUMDOC AS "TEM_NUMDOC"',
      't.TEM_VENDED AS "TEM_VENDED"',
      't.TEM_VENTA AS "TEM_VENTA"',
      't.TEM_VALCOS AS "TEM_VALCOS"',
      't.TEM_UTILIDAD AS "TEM_UTILIDAD"',
      't.TEM_PORCENTAJE_UTILIDAD AS "TEM_PORCENTAJE_UTILIDAD"',
      't.CL_DEPART AS "CL_DEPART"',
      't.CLI_CIUDAD AS "CLI_CIUDAD"',
    ]);
    // Filtro por tem_cedula
    if (input.tem_cedula) {
      queryBuilder.andWhere('t.TEM_CEDULA = :cedula', {
        cedula: input.tem_cedula,
      });
    }

    // Filtro por tem_nomcli
    if (input.tem_nomcli) {
      queryBuilder.andWhere('t.TEM_NOMCLI LIKE :clientName', {
        clientName: `%${input.tem_nomcli}%`,
      });
    }

    // Filtro por tem_numdoc
    if (input.tem_numdoc) {
      queryBuilder.andWhere('t.TEM_NUMDOC = :numberDocument', {
        numberDocument: input.tem_numdoc,
      });
    }

    // Filtro por tem_vended
    if (input.tem_vended) {
      queryBuilder.andWhere('t.TEM_VENDED = :seller', {
        seller: input.tem_vended,
      });
    }

    // Filtro por fecha desde (tem_fecha_desde)
    if (input.tem_fecha_desde) {
      queryBuilder.andWhere('t.TEM_FECHA >= :fechaDesde', {
        fechaDesde: input.tem_fecha_desde,
      });
    }

    // Filtro por fecha hasta (tem_fecha_hasta)
    if (input.tem_fecha_hasta) {
      queryBuilder.andWhere('t.TEM_FECHA <= :fechaHasta', {
        fechaHasta: input.tem_fecha_hasta,
      });
    }

    // Ejecutar la consulta y devolver los resultados
    const documentFletes = await queryBuilder.getRawMany<FletesWithDocument>();
    return documentFletes
  }
  async beforeCreate(context: IContext, repository: Repository<Fletes>, entity: Fletes, createInput: CreateFletesInput): Promise<void> {
    // const findOne = await this.findOneByCode(context,createInput.numberDocument)
  }

  async findOneByCode(context: IContext, code: string, orFail: boolean = false){
    if(!code) throw new Error('Code not send to function')
    const repository = this.getRepository(context);
    
    const findOne = await repository.findOneBy({
      numberDocument: code
    })
    
    if(!findOne && orFail) throw new Error(`Number invoice ${code} not found to database`)

    return findOne
  }
}
