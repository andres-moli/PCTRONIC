import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { CrudEntity } from "../../../patterns/crud-pattern/entities/crud-entity";


@Entity({ name:'grl_position'})
@ObjectType()
export class Position extends CrudEntity {

    @Column()
    @Field(() => String)
    name: string;
}