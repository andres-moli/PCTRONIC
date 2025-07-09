import { InputType, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';
import { StatusVisitEnum } from '../../emun/visit.emun';

@InputType()
export class findOneVisitInProcessInput {
    @Field(() => String)
    @IsString()
    userId: string

}
@InputType()
export class generateWorkedHoursInput {
    @Field(() => String)
    @IsString()
    fechaInicio: string
    
    @Field(() => String)
    @IsString()
    fechaFinal: string

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    userId?: string
    
    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    typeId?: string

}
