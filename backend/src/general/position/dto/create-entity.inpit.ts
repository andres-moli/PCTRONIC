import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreatePositionInput {

    @Field(() => String, { nullable: true })
    @IsString()
    name: string

}