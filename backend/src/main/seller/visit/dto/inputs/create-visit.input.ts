import { InputType, Field, Float } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';
import { StatusVisitEnum } from '../../emun/visit.emun';
import { CreateVisitToolUnitInput } from 'src/main/seller/tools/tool-visit/dto/input/create-visit-tool-unit.input';

@InputType()
export class CreateVisitInput {
    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    description?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    location?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    latitude?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    longitude?:string;


    @Field(() => Boolean, {nullable: true})
    @IsBoolean()
    @IsOptional()
    mocked: boolean

    @Field(() => Date)
    @IsDate()
    dateVisit: Date;


    @Field(() => String)
    @IsString()
    userId: string

    @Field(() => String)
    @IsString()
    typeId: string
    
    @Field(() => StatusVisitEnum)
    status: StatusVisitEnum;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    fileId?:string;

    @Field(() => [CreateVisitToolUnitInput], {nullable: true})
    @IsArray({each: true})
    tools: CreateVisitToolUnitInput[]

}
