import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientInput } from '../dto/inputs/create-client.input';
import { UpdateClientInput } from '../dto/inputs/update-client.input';
import { FindCitiesArgs } from 'src/general/city/dto/args/find-cities.arg';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { ClientNotificationService } from './client.notification.service';
import { ClientContact } from '../entities/client-contact.entity';
import { FindClientArgs } from '../dto/args/find-client.args';
import { CreateClientContactInput } from '../dto/inputs/create-client-contact.input';
import { UpdateClientContactInput } from '../dto/inputs/update-client-contact.input';
import { FindClientContactArgs } from '../dto/args/find-client-contact.args';
import { ClientService } from './client.service';

export const serviceStructure = CrudServiceStructure({
  entityType: ClientContact,
  createInputType: CreateClientContactInput,
  updateInputType: UpdateClientContactInput,
  findArgsType: FindClientContactArgs,
});

@Injectable()
export class ClientContactService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly clientNotification:ClientNotificationService,
    private readonly clientService: ClientService
  ){ super(); }

  async beforeCreate(context: IContext, repository: Repository<ClientContact>, entity: ClientContact, createInput: CreateClientContactInput): Promise<void> {
    entity.client = await this.clientService.findOne(context,createInput.clientId,true);
  }

}
