import { IsString } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateVisitProjectInput } from './create-visit-project.input';

@InputType()
export class UpdateVisitProjectInput extends PartialType(CreateVisitProjectInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
