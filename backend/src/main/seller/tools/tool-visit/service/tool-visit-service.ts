import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { VisitToolUnit } from '../entities/visit-tool-unit.entity';
import { CreateVisitToolUnitAllInput, CreateVisitToolUnitInput } from '../dto/input/create-visit-tool-unit.input';
import { UpdateVisitToolUnitInput } from '../dto/input/update-visit-tool-unit.input';
import { FindVisitToolUnitArgs } from '../dto/arg/tools-visit-arg';
import { ToolUnitService } from '../../tool-item/service/tool-item-service';
import { VisitService } from 'src/main/seller/visit/services/visit.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { VisitToolUnitPhotoService } from '../../tool-photo/service/tool-photo-service';
import { ToolUnitStatusEnum } from '../../tool-item/emun/tool-unit-status.enum';

export const serviceStructure = CrudServiceStructure({
  entityType: VisitToolUnit,
  createInputType: CreateVisitToolUnitInput,
  updateInputType: UpdateVisitToolUnitInput,
  findArgsType: FindVisitToolUnitArgs,
});

@Injectable()
export class VisitToolVisittService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly toolUnitService: ToolUnitService,
    @Inject(forwardRef(() => VisitService))
    private readonly visitService: VisitService,
    @Inject(forwardRef(() => VisitToolUnitPhotoService))
    private readonly visitToolUnitPhotoService: VisitToolUnitPhotoService,
  ) {
    super();
  }

  async beforeCreate(context: IContext, repository: Repository<VisitToolUnit>, entity: VisitToolUnit, createInput: CreateVisitToolUnitInput): Promise<void> {
    if (createInput.toolUnitId) {
      entity.toolUnit = await this.toolUnitService.findOne(context,createInput.toolUnitId,true);
      await this.toolUnitService.update(context, createInput.toolUnitId, {
        id: createInput.toolUnitId,
        status: ToolUnitStatusEnum.IN_USE
      })
    }
    if (createInput.visitId) {
      entity.visit = await this.visitService.findOne(context,createInput.visitId,true);
    }
  }
  async beforeUpdate(context: IContext, repository: Repository<VisitToolUnit>, entity: VisitToolUnit, updateInput: UpdateVisitToolUnitInput): Promise<void> {
    if(updateInput.status){
      entity.status = updateInput.status;
      entity.user = (context.user) as any
      entity.entryDate = new Date()
      const toolUnit = (await entity.toolUnit)
      await this.toolUnitService.update(context, toolUnit.id, {
        id:  toolUnit.id,
        status: updateInput.status
      })
    }
  }
  async afterCreate(context: IContext, repository: Repository<VisitToolUnit>, entity: VisitToolUnit, createInput: CreateVisitToolUnitInput): Promise<void> {
    for(const photoUrls of createInput.photoUrls){
      await this.visitToolUnitPhotoService.create(context, {
        fileId: photoUrls,
        visitToolUnitId: entity.id,
        dummy: ''
      })
    }
  }
  async createAll(context: IContext, createInput: CreateVisitToolUnitAllInput){
    if (Array.isArray(createInput.input)){
      for (const tool of createInput.input) {
        this.create(context, {
          toolUnitId: tool.toolUnitId,
          visitId: tool.visitId,
          photoUrls: tool.photoUrls,
          usageDate: new Date()
        });
      }
    }
    return 'TODO BIEN'
  }
}
