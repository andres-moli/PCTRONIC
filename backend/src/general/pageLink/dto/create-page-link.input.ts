import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { RouterType } from "../enum/router-type.enum";

@InputType()
export class CreatePageLinkInput {

    @Field(() => RouterType, { nullable: true })
    @IsString()
    @IsOptional()
    routeType?: RouterType

    @Field(() => [String], { nullable: true})
    @IsString()
    @IsArray()
    @IsOptional()
    arguments?: string []

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    target?:string; 

    @Field(() => String, { nullable: true})
    @IsString()
    @IsOptional()
    url?: string

}