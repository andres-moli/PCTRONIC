import { IsString } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateFletesInput } from './create-fletes.input';

@InputType()
export class UpdateFletesInput extends PartialType(CreateFletesInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
