import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateToolInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  reference: string;
}
