import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { BooleanFilter } from 'src/patterns/crud-pattern/classes/inputs/boolean-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';

@InputType({ isAbstract: true })
class FindScheduleWhere {
  @Field(() => StringFilter, { nullable: true })
  day?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  startTime?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  endTime?: StringFilter;

  @Field(() => BooleanFilter, { nullable: true })
  isDayOff?: BooleanFilter;

  @Field(() => StringFilter, { nullable: true })
  user?: StringFilter;
}

@InputType({ isAbstract: true })
class FindScheduleOrderBy {
  @Field(() => OrderByTypes, { nullable: true })
  createdAt?: OrderByTypes;

  @Field(() => OrderByTypes, { nullable: true })
  startTime?: OrderByTypes;

  @Field(() => OrderByTypes, { nullable: true })
  day?: OrderByTypes;
}

@ArgsType()
export class FindScheduleArgs extends FindArgs(
  FindScheduleWhere,
  FindScheduleOrderBy,
) {}
