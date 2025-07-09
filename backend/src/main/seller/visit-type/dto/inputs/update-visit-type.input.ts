import { IsString } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateVisitTypeInput } from './create-visit-type.input';

@InputType()
export class UpdateVisitTypeInput extends PartialType(CreateVisitTypeInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
