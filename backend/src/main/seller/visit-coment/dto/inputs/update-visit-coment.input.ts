import { IsString } from 'class-validator';
import { CreateVisitComentInput } from './create-visit-coment.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateVisitComentInput extends PartialType(CreateVisitComentInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
