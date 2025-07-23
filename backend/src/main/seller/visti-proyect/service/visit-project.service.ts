import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { VisitProject } from '../entities/visit-project.entity';
import { CreateVisitProjectInput } from '../dto/inputs/create-visit-project.input';
import { UpdateVisitProjectInput } from '../dto/inputs/update-visit-project.input';
import { FindVisitProjectArgs } from '../dto/args/find-visit-project.args';

export const serviceStructure = CrudServiceStructure({
  entityType: VisitProject,
  createInputType: CreateVisitProjectInput,
  updateInputType: UpdateVisitProjectInput,
  findArgsType: FindVisitProjectArgs,
});

@Injectable()
export class VisitProjectService extends CrudServiceFrom(serviceStructure) {
  constructor(
  ){ super(); }
}
