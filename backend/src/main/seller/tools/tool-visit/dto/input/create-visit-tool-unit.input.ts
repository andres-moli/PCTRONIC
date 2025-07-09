import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class CreateVisitToolUnitInput {
  @Field(() => ID)
  visitId: string;

  @Field(() => ID)
  toolUnitId: string;

  @Field(() => Date, { nullable: true })
  usageDate?: Date;

  // opcionalmente puedes incluir fotos aquí directamente
  @Field(() => [String], { nullable: true, description: 'URLs de las fotos' })
  photoUrls?: string[];
}

@InputType()
export class CreateVisitToolUnitAllInput {
  @Field(() => [CreateVisitToolUnitInput])
  @IsArray()
  input: CreateVisitToolUnitInput[];
}
