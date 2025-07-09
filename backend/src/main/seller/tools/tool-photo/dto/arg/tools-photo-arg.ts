import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';

@InputType({ isAbstract: true })
class FindVisitToolUnitPhotoWhere {
  @Field(() => StringFilter)
  url: StringFilter;
  @Field(() => StringFilter)
  visitToolUnit: StringFilter
}

@InputType({ isAbstract: true })
class FindVisitToolUnitPhotoOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindVisitToolUnitPhotoArgs extends FindArgs(FindVisitToolUnitPhotoWhere, FindVisitToolUnitPhotoOrderBy) {}
