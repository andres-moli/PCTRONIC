import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";
import { CreatePositionInput } from "./create-entity.inpit";

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {

  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
  
}
