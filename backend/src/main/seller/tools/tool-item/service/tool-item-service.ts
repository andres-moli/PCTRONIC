import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { ToolUnit } from '../entities/tool-unit.entity';
import { CreateToolUnitInput } from '../dto/input/create-tool-unit.input';
import { UpdateToolUnitInput } from '../dto/input/update-tool-unit.input';
import { FindToolUnitArgs } from '../../tool/dto/arg/tools-arg';
import { ToolService } from '../../tool/service/tool-service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';

export const serviceStructure = CrudServiceStructure({
  entityType: ToolUnit,
  createInputType: CreateToolUnitInput,
  updateInputType: UpdateToolUnitInput,
  findArgsType: FindToolUnitArgs,
});

@Injectable()
export class ToolUnitService extends CrudServiceFrom(serviceStructure) {
  constructor(private readonly toolService: ToolService) {
    super();
  }

  async beforeCreate(context: IContext, repository: Repository<ToolUnit>, entity: ToolUnit, createInput: CreateToolUnitInput): Promise<void> {
    if (createInput.toolId) {
      const tool = await this.toolService.findOne(context, createInput.toolId,true);
      entity.tool = tool;
    }
  }
  async beforeUpdate(context: IContext, repository: Repository<ToolUnit>, entity: ToolUnit, updateInput: UpdateToolUnitInput): Promise<void> {
    if (updateInput.toolId) {
      const tool = await this.toolService.findOne(context, updateInput.toolId,true);
      entity.tool = tool;
    }
  }
}
