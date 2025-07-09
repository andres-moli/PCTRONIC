import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsDateString } from 'class-validator';
import { Fletes } from '../../entities/fletes.entity';

@ObjectType()
export class FacturaResponseModel{
  @Field(() => String)
  @IsString()
  TEM_CEDULA: string;

  @Field(() => String)
  @IsString()
  TEM_NOMCLI: string;

  @Field(() => String)
  @IsDateString()
  TEM_FECHA: string;

  @Field(() => String)
  @IsString()
  TEM_TIPMOV: string;

  @Field(() => String)
  @IsString()
  TEM_PREFIJ: string;

  @Field(() => String)
  @IsString()
  TEM_NUMDOC: string;

  @Field(() => String)
  @IsString()
  TEM_VENDED: string;

  @Field(() => String)
  @IsString()
  TEM_VENTA: string;

  @Field(() => String)
  @IsString()
  TEM_VALCOS: string;

  @Field(() => String)
  @IsString()
  TEM_UTILIDAD: string;

  @Field(() => String)
  @IsString()
  TEM_PORCENTAJE_UTILIDAD: string;
  
  @Field(() => String)
  @IsString()
  CL_DEPART: string;

  
  @Field(() => String)
  @IsString()
  CLI_CIUDAD: string;
}


@ObjectType()
export class findOneFacturaClienteByCode {
  @Field(()=> Boolean)
  isFound: boolean;

  @Field(()=> Fletes, {nullable: true})
  flete?: Fletes;
}