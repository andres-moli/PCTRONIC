import { IsString } from 'class-validator';
import { CreateClientInput } from './create-client.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
