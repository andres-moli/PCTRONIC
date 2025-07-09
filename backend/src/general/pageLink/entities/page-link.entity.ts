import { Column, Entity } from "typeorm";
import { CrudEntity } from "../../../patterns/crud-pattern/entities/crud-entity";
import { RouterType } from "../enum/router-type.enum";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('grl_pageLink')
@ObjectType()
export class PageLink extends CrudEntity{

    @Column({ nullable: true })
    @Field(() => RouterType, { nullable: true })
    routeType?: RouterType;

    @Column({ nullable: true, default: '' })
    @Field(() => String, { nullable: true })
    target?:string; 

    @Column('simple-array', { nullable: true })
    @Field(() => [ String ], { nullable: true })
    arguments?: string []

    @Column({ nullable: true, length: 2000 })
    @Field(() => String, { nullable: true })
    url?: string

}