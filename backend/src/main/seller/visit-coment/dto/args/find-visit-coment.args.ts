import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';



@InputType({ isAbstract: true })
class FindVisitComentWhere {
  @Field(() => StringFilter)
  type: StringFilter

  @Field(() => StringFilter)
  status: StringFilter

  @Field(() => StringFilter)
  visit: StringFilter;

  @Field(()=> DateFilter)
  date: DateFilter

  @Field(() => StringFilter)
  user: StringFilter;
}

@InputType({ isAbstract: true })
class FindVisitComentOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

  @Field(() => OrderByTypes)
  date: OrderByTypes;
}

@ArgsType()
export class FindVisitComentArgs extends FindArgs(
  FindVisitComentWhere,
  FindVisitComentOrderBy,
) {
}
