import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateClientInput } from '../dto/inputs/create-client.input';
import { UpdateClientInput } from '../dto/inputs/update-client.input';
import { FindCitiesArgs } from 'src/general/city/dto/args/find-cities.arg';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { ClientNotificationService } from './client.notification.service';
import { FindClientArgs } from '../dto/args/find-client.args';
import { User } from 'src/security/users/entities/user.entity';
import { DepartmentService } from 'src/general/department/services/department.service';
import { CityService } from 'src/general/city/services/city.service';
import { MailService } from 'src/general/email/service/email.service';
import { ClientContactService } from './client-contact.service';
import { ClientContact } from '../entities/client-contact.entity';
import { UsersService } from 'src/security/users/services/users.service';
import { City } from 'src/general/city/entities/city.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: Client,
  createInputType: CreateClientInput,
  updateInputType: UpdateClientInput,
  findArgsType: FindClientArgs,
});

@Injectable()
export class ClientService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly clientNotification:ClientNotificationService,
    private readonly departmentService: DepartmentService,
    private readonly cityService: CityService,
    private readonly mailService: MailService,
    private readonly userService: UsersService

  ){ super(); }

  // getQueryBuilder(context: IContext, args?: FindClientArgs): SelectQueryBuilder<Client> {
  //   const repository = this.getRepository(context);
  //   let qb = repository.createQueryBuilder("aa");
  //   if(args?.cityName){
  //     qb.leftJoin(City, 'ct', 'ct.id = aa.city')
  //     qb.orWhere(`ct.name ILIKE '%${args.cityName}%'`)
  //     return qb
  //   }
  //   return qb
  // }
  async beforeCreate(context:IContext,repository: Repository<Client>, entity: Client, createInput: CreateClientInput): Promise<void> {
    const oldClient = await repository.findOne({
      where: {
        numberDocument: createInput.numberDocument
      }
    })
    if(oldClient) throw new Error(`ya existe un cliente con este nit - [${createInput.numberDocument}]`)
    entity.user = await this.userService.findOne(context,createInput.userId, true)
    entity.department = await this.departmentService.departmentOne(context, createInput.departmentId,true)
    entity.city = await this.cityService.cityOne(context, createInput.cityId,true)
  }

  async beforeUpdate(context: IContext, repository: Repository<Client>, entity: Client, updateInput: UpdateClientInput): Promise<void> {
    entity.user = await this.userService.findOne(context,updateInput.userId, true)
    entity.department = await this.departmentService.departmentOne(context, updateInput.departmentId,true)
    entity.city = await this.cityService.cityOne(context, updateInput.cityId,true)
  }
  async clientContact(context:IContext, id: string){
    const repository = this.getRepository(context)
    const client = await this.findOne(context,id,true);
    const contact = await repository.manager.find(ClientContact, {
      where: {
        client: {
          id: id
        }
      }
    })
    return {client,contact}
  }
}
