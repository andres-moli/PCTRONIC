import { InputType, Field, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';
import { Role } from '../entities/role.entity';

@InputType()
export class CreateAndRemoveRoleFxInput {

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  permissions: string[];

  @Field(() => ID)
  @IsUUID()
  role: Role;
}
