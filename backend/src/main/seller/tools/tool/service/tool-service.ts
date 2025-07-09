import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { Tool } from '../entities/tool.entity';
import { CreateToolInput } from '../dto/input/create-tool.input';
import { UpdateToolInput } from '../dto/input/update-tool.input';
import { FindToolArgs } from '../../tool-item/dto/arg/tools-arg-unit';

export const serviceStructure = CrudServiceStructure({
  entityType: Tool,
  createInputType: CreateToolInput,
  updateInputType: UpdateToolInput,
  findArgsType: FindToolArgs,
});

@Injectable()
export class ToolService extends CrudServiceFrom(serviceStructure) {
  constructor() {
    super();
  }
}
