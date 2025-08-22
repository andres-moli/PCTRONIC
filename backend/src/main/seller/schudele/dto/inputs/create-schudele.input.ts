import { IsEnum, IsOptional, IsString, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { WeekDay } from '../../emun/schudele.enum';

@InputType()
export class CreateScheduleDto {


  @Field(() => Date)
  @IsDate()
  date: Date;
  @Field(() => WeekDay)
  @IsEnum(WeekDay)
  day: WeekDay;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  startTime?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  endTime?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string
  @Field(() => Boolean, { defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isDayOff?: boolean = false;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}
