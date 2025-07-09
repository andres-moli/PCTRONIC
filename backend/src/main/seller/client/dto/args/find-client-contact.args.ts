import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';



@InputType({ isAbstract: true })
class FindClientContactWhere {
  @Field(() => StringFilter)
  numberDocument: StringFilter;

  @Field(() => StringFilter)
  name: StringFilter;
  
  @Field(() => StringFilter)
  client: StringFilter;
}

@InputType({ isAbstract: true })
class FindClientContactOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

  @Field(() => OrderByTypes)
  numberDocument: OrderByTypes;
}

@ArgsType()
export class FindClientContactArgs extends FindArgs(
  FindClientContactWhere,
  FindClientContactOrderBy,
) {
}
