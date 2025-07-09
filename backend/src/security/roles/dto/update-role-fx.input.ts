import { CreateAndRemoveRoleFxInput } from './create-and-remove-role-fx.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoleFxInput extends PartialType(CreateAndRemoveRoleFxInput) {

  @Field(() => ID)
  id: string;
  
}
