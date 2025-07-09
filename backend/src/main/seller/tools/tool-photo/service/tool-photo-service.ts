import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { ToolUnitPhoto } from '../entities/tool-unit-photo.entity';
import { CreateToolUnitPhotoInput } from '../dto/create-tool-unit-photo.input';
import { UpdateToolUnitPhotoInput } from '../dto/update-tool-unit-photo.input';
import { FindVisitToolUnitPhotoArgs } from '../dto/arg/tools-photo-arg';
import { VisitToolVisittService } from '../../tool-visit/service/tool-visit-service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { FilesService } from 'src/general/files/services/files.service';


export const serviceStructure = CrudServiceStructure({
  entityType: ToolUnitPhoto,
  createInputType: CreateToolUnitPhotoInput,
  updateInputType: UpdateToolUnitPhotoInput,
  findArgsType: FindVisitToolUnitPhotoArgs,
});

@Injectable()
export class VisitToolUnitPhotoService extends CrudServiceFrom(serviceStructure) {
  constructor(
    @Inject(forwardRef(() => VisitToolVisittService))
    private readonly visitToolUnitService: VisitToolVisittService,
    private readonly fileService: FilesService
  ) {
    super();
  }

  async beforeCreate(context: IContext, repository: Repository<ToolUnitPhoto>, entity: ToolUnitPhoto, createInput: CreateToolUnitPhotoInput): Promise<void> {
    if (createInput.visitToolUnitId) {
      entity.visitToolUnit = await this.visitToolUnitService.findOne(context, createInput.visitToolUnitId, true);
    }
    if(createInput.fileId){
      entity.file = await this.fileService.findOne(context, createInput.fileId, true);
    }

  }
}
