import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';



@InputType({ isAbstract: true })
class FindVisitDetailsWhere {
  @Field(() => StringFilter)
  numberDocument: StringFilter;

  @Field(() => StringFilter)
  name: StringFilter;
}

@InputType({ isAbstract: true })
class FindVisitDetailsOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

  @Field(() => OrderByTypes)
  numberDocument: OrderByTypes;
}

@ArgsType()
export class FindVisitDetailsArgs extends FindArgs(
  FindVisitDetailsWhere,
  FindVisitDetailsOrderBy,
) {
}
