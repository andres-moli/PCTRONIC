import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;
  
}
