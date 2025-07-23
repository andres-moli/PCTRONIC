import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class BooleanFilter {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  _eq?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  _neq?: boolean;

  @Field(() => [Boolean], { nullable: true })
  @IsArray()
  @IsOptional()
  _in?: boolean[];
}
