import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
export class LocationInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}

@InputType()  // Esto indica que es un tipo de entrada
export class MessageInput {
  @Field(() => String)
  @IsString()
  senderId: string;

  @Field(() => String)
  @IsString()
  content: string;
}

@ObjectType()  // Esto indica que es un tipo de salida
export class Message {
  @Field(() => String, {nullable: true})
  @IsString()
  id: string;

  @Field(() => String,{nullable: true})
  @IsString()
  senderId: string;

  @Field(() => String,{nullable: true})
  @IsString()
  content: string;

  @Field(() => String,{nullable: true})
  @IsString()
  timestamp: string;
}
