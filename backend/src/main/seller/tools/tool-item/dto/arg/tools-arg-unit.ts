import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';

@InputType({ isAbstract: true })
class FindToolWhere {
  @Field(() => StringFilter)
  name: StringFilter;

  @Field(() => StringFilter)
  description: StringFilter;

  @Field(() => StringFilter)
  type: StringFilter;
}

@InputType({ isAbstract: true })
class FindToolOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindToolArgs extends FindArgs(FindToolWhere, FindToolOrderBy) {}
