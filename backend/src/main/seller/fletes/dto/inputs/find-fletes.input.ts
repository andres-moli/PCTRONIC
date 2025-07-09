import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class FacturaPorClienteDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tem_cedula?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tem_nomcli?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  tem_fecha_desde?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  tem_fecha_hasta?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tem_numdoc?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tem_vended?: string;
}
