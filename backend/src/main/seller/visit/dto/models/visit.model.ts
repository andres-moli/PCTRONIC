import { Field, ObjectType } from "@nestjs/graphql";
import { Visit } from "../../entities/visit.entity";

@ObjectType()
export class VisitDashboardModel {
    @Field(() => [Visit]) 
    earrings: Visit[]

    @Field(() => [Visit]) 
    realized: Visit[]
}