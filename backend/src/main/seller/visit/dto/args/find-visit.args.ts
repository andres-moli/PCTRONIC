import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';



@InputType({ isAbstract: true })
class FindVisitWhere {
  @Field(() => DateFilter)
  dateVisit: DateFilter;

  @Field(() => StringFilter)
  status: StringFilter

  @Field(() => StringFilter)
  client: StringFilter;

  @Field(() => StringFilter)
  description: StringFilter;

  @Field(() => StringFilter)
  user: StringFilter;
  @Field(() => DateFilter)
  createdAt: DateFilter
}

@InputType({ isAbstract: true })
class FindVisitOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

  @Field(() => OrderByTypes)
  dateVisit: OrderByTypes;
}

@ArgsType()
export class FindVisitArgs extends FindArgs(
  FindVisitWhere,
  FindVisitOrderBy,
) {
}
