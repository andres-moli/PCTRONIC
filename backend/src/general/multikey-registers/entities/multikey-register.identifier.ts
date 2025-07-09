import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsInt } from "class-validator";
import { PrimaryColumn } from "typeorm"

@ObjectType()
@InputType('MultikeyRegisterIdInput')
export class MultikeyRegisterId {    

    @Field( () => Int )
    @PrimaryColumn({ name:"AnoCod" })
    @IsInt()
    year: number;
  
    @Field( () => Int )
    @PrimaryColumn({ name:"RegCod" })
    @IsInt()
    id: number;
}