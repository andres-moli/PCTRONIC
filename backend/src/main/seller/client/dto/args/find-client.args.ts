import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';



@InputType({ isAbstract: true })
class FindClientWhere {
  @Field(() => StringFilter)
  numberDocument: StringFilter;

  @Field(() => StringFilter)
  name: StringFilter;

  @Field(() => StringFilter)
  user: StringFilter;

  @Field(() => StringFilter)
  city: StringFilter

  @Field(() => StringFilter)
  department: StringFilter
}

@InputType({ isAbstract: true })
class FindClientOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

  @Field(() => OrderByTypes)
  numberDocument: OrderByTypes;

  @Field(() => OrderByTypes)
  name: OrderByTypes;
}

@ArgsType()
export class FindClientArgs extends FindArgs(
  FindClientWhere,
  FindClientOrderBy,
) {
  
}
