import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateVisitToolUnitInput } from './create-visit-tool-unit.input';
import { IsString } from 'class-validator';
import { ToolUnitStatusEnum } from '../../../tool-item/emun/tool-unit-status.enum';

@InputType()
export class UpdateVisitToolUnitInput extends PartialType(CreateVisitToolUnitInput) {
    @Field(() => ID)
    @IsString()
    id: string;

    @Field(() => ToolUnitStatusEnum, { nullable: true})
    status?: ToolUnitStatusEnum;
}
