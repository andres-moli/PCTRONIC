import { MultikeyRegisterId } from '../entities/multikey-register.identifier';
import { CreateMultikeyRegisterInput } from './create-multikey-register.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMultikeyRegisterInput extends PartialType(CreateMultikeyRegisterInput) {

  @Field(() => MultikeyRegisterId)
  id: MultikeyRegisterId;

}
