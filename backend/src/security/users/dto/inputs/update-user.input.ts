import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { UserStatusTypes } from '../../enums/status-type.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;

  @Field(() => Boolean, { nullable:true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Field(() => UserStatusTypes, { nullable:true })
  @IsEnum(UserStatusTypes)
  @IsOptional()
  status: UserStatusTypes
}
