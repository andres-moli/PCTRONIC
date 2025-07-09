import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClientContactInput {
    @Field(() => String)
    @IsString()
    name:string;

    @Field(() => String)
    @IsString()
    celular: string;
  
    @Field(() => String, {nullable: true})
    @IsString()
    telefono?: string;
  
    @Field(() => String)
    @IsEmail()
    email:string;

    @Field(() => String)
    @IsString()
    position:string;

    @Field(() => String)
    @IsString()
    clientId:string;
}
