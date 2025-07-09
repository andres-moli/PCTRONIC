import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { FindCitiesArgs } from 'src/general/city/dto/args/find-cities.arg';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { User } from 'src/security/users/entities/user.entity';
import { FindVisitComentArgs } from '../dto/args/find-visit-coment.args';
import { ClientService } from '../../client/services/client.service';
import { UsersService } from 'src/security/users/services/users.service';
import { ParameterService } from 'src/general/parameters/service/parameter.service';
import { VisitComent } from '../entities/visit-coment.entity';
import { CreateVisitComentInput } from '../dto/inputs/create-visit-coment.input';
import { UpdateVisitComentInput } from '../dto/inputs/update-visit-coment.input';
import { VisitService } from '../../visit/services/visit.service';
import moment from 'moment';
import { FilesService } from 'src/general/files/services/files.service';

export const serviceStructure = CrudServiceStructure({
  entityType: VisitComent,
  createInputType: CreateVisitComentInput,
  updateInputType: UpdateVisitComentInput,
  findArgsType: FindVisitComentArgs,
});

@Injectable()
export class VisitComentService extends CrudServiceFrom(serviceStructure) {
  constructor(
    @Inject(forwardRef(() => VisitService))
    private readonly visitService: VisitService,
    private readonly fileService: FilesService
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<VisitComent>, entity: VisitComent, createInput: CreateVisitComentInput): Promise<void> {
    entity.visit = await this.visitService.findOne(context,createInput.visitId,true);
    entity.user = await context.user as any
    entity.dateFull = moment(moment(createInput.dateFull).format('YYYY-MM-DD HH:mm')).local().toDate()
    if(createInput.fileId){
      entity.file = await this.fileService.findOne(context,createInput.fileId,true)
    }
  }
  async afterCreate(context: IContext, repository: Repository<VisitComent>, entity: VisitComent, createInput: CreateVisitComentInput): Promise<void> {
    if(entity.mocked){
      this.visitService.sendMailMockedFail(context,entity)
    }
  }
}
