import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { BooleanFilter } from 'src/patterns/crud-pattern/classes/inputs/boolean-filter.input'; // Asegúrate de tener esto
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';

@InputType({ isAbstract: true })
class FindVisitProjectWhere {
  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  status?: StringFilter; // Puedes usar EnumFilter si tienes uno para enums

  @Field(() => DateFilter, { nullable: true })
  startDate?: DateFilter;

  @Field(() => DateFilter, { nullable: true })
  endDate?: DateFilter;

  @Field(() => BooleanFilter, { nullable: true })
  isCompleted?: BooleanFilter;
}

@InputType({ isAbstract: true })
class FindVisitProjectOrderBy {
  @Field(() => OrderByTypes, { nullable: true })
  createdAt?: OrderByTypes;

  @Field(() => OrderByTypes, { nullable: true })
  name?: OrderByTypes;

  @Field(() => OrderByTypes, { nullable: true })
  startDate?: OrderByTypes;

  @Field(() => OrderByTypes, { nullable: true })
  endDate?: OrderByTypes;
}

@ArgsType()
export class FindVisitProjectArgs extends FindArgs(
  FindVisitProjectWhere,
  FindVisitProjectOrderBy,
) {}
