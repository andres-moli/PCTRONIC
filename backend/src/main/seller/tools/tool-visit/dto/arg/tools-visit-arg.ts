import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';

@InputType({ isAbstract: true })
class FindVisitToolUnitWhere {
  @Field(() => StringFilter)
  comment: StringFilter;

  @Field(() => DateFilter)
  createdAt: DateFilter;
}

@InputType({ isAbstract: true })
class FindVisitToolUnitOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindVisitToolUnitArgs extends FindArgs(FindVisitToolUnitWhere, FindVisitToolUnitOrderBy) {}
