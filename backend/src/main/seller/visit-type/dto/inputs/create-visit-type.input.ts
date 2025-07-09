import { InputType, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsDecimal, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { VisitTypeStatusEnum } from '../../emun/visit-type.enum';
@InputType()
export class CreateVisitTypeInput {
    @Field(() => String)
    @IsString()
    description:string;

    @Field(() => String)
    @IsString()
    name: string

    @Field(() => VisitTypeStatusEnum)
    @IsEnum(VisitTypeStatusEnum)
    status: VisitTypeStatusEnum
}
