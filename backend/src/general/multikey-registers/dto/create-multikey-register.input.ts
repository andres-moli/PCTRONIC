import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { MultikeyRegisterId } from '../entities/multikey-register.identifier';

@InputType()
export class CreateMultikeyRegisterInput {
  
  @Field(() => MultikeyRegisterId)
  id: MultikeyRegisterId;

  @Field( () => Date )
  @IsDate()
  date: Date;

  @Field( () => String )
  @IsDate()
  description: string;
}
