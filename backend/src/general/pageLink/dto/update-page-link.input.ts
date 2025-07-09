import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreatePageLinkInput } from './create-page-link.input';
import { IsString, IsUUID } from "class-validator";

@InputType()
export class UpdatePageLinkInput extends PartialType(CreatePageLinkInput) {

  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
  
}
