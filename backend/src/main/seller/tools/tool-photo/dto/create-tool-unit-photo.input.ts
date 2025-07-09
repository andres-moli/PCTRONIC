import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateToolUnitPhotoInput {
  @Field(() => String)
  fileId: string;

  @Field(() => ID)
  visitToolUnitId: string;

  dummy: string;
}
