import { InputType, Field, ID } from '@nestjs/graphql';
import { ToolUnitStatusEnum } from '../../emun/tool-unit-status.enum';

@InputType()
export class CreateToolUnitInput {
  @Field(() => ID)
  toolId: string;

  @Field(() => String)
  name: string;

  @Field(() => ToolUnitStatusEnum, { defaultValue: ToolUnitStatusEnum.AVAILABLE })
  status?: ToolUnitStatusEnum;
}
