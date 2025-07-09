import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';



@InputType({ isAbstract: true })
class FindDocWhere {
  @Field(() => StringFilter)
  tipoDocumento: StringFilter;

  @Field(() => StringFilter)
  usuario: StringFilter;

}

@InputType({ isAbstract: true })
class FindDocOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindDocArgs extends FindArgs(
  FindDocWhere,
  FindDocOrderBy,
) {
  
}
