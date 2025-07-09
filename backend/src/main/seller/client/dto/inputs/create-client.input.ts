import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { TypeClientEnum } from '../../emun/client.enum';

@InputType()
export class CreateClientInput {
    @Field(() => String)
    @IsString()
    name:string;
  
    @Field(() => String)
    @IsDate()
    numberDocument:string;

    @Field(() => String)
    @IsString()
    celular: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    descripcion?: string;

    @Field(() => String, {nullable: true})
    @IsString()
    telefono?: string;
  
    @Field(() => String, {nullable: true})
    @IsEmail()
    @IsOptional()
    email?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    address?:string;
    
    @Field(() => TypeClientEnum)
    @IsEnum(TypeClientEnum)
    type?: TypeClientEnum;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    vertical?: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    cityId?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    departmentId?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    countryId?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    userId?:string;
}
