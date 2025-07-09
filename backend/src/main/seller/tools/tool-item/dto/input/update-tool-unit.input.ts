import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateToolUnitInput } from './create-tool-unit.input';
import { IsString } from 'class-validator';

@InputType()
export class UpdateToolUnitInput extends PartialType(CreateToolUnitInput) {
    @Field(() => ID)
    @IsString()
    id: string;
}
