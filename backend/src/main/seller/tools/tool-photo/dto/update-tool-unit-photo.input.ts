import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateToolUnitPhotoInput } from './create-tool-unit-photo.input';
import { IsString } from 'class-validator';

@InputType()
export class UpdateToolUnitPhotoInput extends PartialType(CreateToolUnitPhotoInput) {
    @Field(() => ID)
    @IsString()
    id: string;
}
