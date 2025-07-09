import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { VisitService } from '../../visit/services/visit.service';
import { VisitType } from '../entities/visit-type.entity';
import { CreateVisitTypeInput } from '../dto/inputs/create-visit-type.input';
import { UpdateVisitTypeInput } from '../dto/inputs/update-visit-type.input';
import { FindVisitTypeArgs } from '../dto/args/find-visit-type.args';

export const serviceStructure = CrudServiceStructure({
  entityType: VisitType,
  createInputType: CreateVisitTypeInput,
  updateInputType: UpdateVisitTypeInput,
  findArgsType: FindVisitTypeArgs,
});

@Injectable()
export class VisitTypeService extends CrudServiceFrom(serviceStructure) {
  constructor(
  ){ super(); }
}
