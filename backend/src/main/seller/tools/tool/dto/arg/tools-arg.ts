import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';

@InputType({ isAbstract: true })
class FindToolUnitWhere {
  @Field(() => StringFilter)
  serialNumber: StringFilter;

  @Field(() => StringFilter)
  status: StringFilter;
}

@InputType({ isAbstract: true })
class FindToolUnitOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindToolUnitArgs extends FindArgs(FindToolUnitWhere, FindToolUnitOrderBy) {}
