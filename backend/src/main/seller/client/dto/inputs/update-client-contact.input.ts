import { IsString } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateClientContactInput } from './create-client-contact.input';

@InputType()
export class UpdateClientContactInput extends PartialType(CreateClientContactInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
