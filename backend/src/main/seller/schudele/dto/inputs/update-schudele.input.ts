import { PartialType } from '@nestjs/mapped-types';
import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateScheduleDto } from './create-schudele.input';
import { WeekDay } from '../../emun/schudele.enum';

@InputType()
export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @Field(() => String)
  @IsString()
  id: string; // Por si necesitas enviar el ID para actualizar desde el front4
  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  date?: Date;
  
  @Field(() => WeekDay, { nullable: true })
  @IsEnum(WeekDay)
  @IsOptional()
  day?: WeekDay;
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  startTime?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  endTime?: string;
}
