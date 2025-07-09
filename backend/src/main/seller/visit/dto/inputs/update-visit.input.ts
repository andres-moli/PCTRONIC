import { IsString } from 'class-validator';
import { CreateVisitInput } from './create-visit.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateVisitInput extends PartialType(CreateVisitInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
