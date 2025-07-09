import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

@InputType()
export class CreateProfileInput {

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => Int)
  @IsNumber()
  city: number;

  @Field(() => Int)
  @IsNumber()
  region: number;

  @Field(() => String)
  @IsString()
  document: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  phone?: string;
}
