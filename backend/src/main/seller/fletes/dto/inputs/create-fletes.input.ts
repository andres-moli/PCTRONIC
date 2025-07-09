import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsMobilePhone } from 'class-validator';

@InputType()
export class CreateFletesInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  numberDocument: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  valueFlete: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  oip: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  backComision: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  numberGuia: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  carrier: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  carrierCell: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  contactClient: string;
}
