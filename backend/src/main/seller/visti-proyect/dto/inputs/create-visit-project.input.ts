import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { VisitProjectStatusEnum } from '../../emun/visit-project-status.enum';

@InputType()
export class CreateVisitProjectInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => VisitProjectStatusEnum, { defaultValue: VisitProjectStatusEnum.PLANNED })
  @IsEnum(VisitProjectStatusEnum)
  status: VisitProjectStatusEnum;

  @Field(() => String, { nullable: true, description: 'Formato: yyyy-MM-dd' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field(() => String, { nullable: true, description: 'Formato: yyyy-MM-dd' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
