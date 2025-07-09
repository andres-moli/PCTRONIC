import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateToolInput } from './create-tool.input';
import { IsString } from 'class-validator';

@InputType()
export class UpdateToolInput extends PartialType(CreateToolInput) {
    @Field(() => ID)
    @IsString()
    id: string;
}
