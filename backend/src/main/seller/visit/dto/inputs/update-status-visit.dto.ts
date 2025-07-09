import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { StatusVisitEnum } from "../../emun/visit.emun";

@InputType()
export class UpdateStatusInput {
    @Field(() => String)
    @IsString()
    id:string;

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

    @Field(() => Date)
    @IsDate()
    dateVisit: Date;
    @Field(() => StatusVisitEnum)
    @IsString()
    status: StatusVisitEnum;
    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    fileId?:string;

    @Field(() => Boolean, {nullable: true})
    @IsBoolean()
    @IsOptional()
    mocked?: boolean
}