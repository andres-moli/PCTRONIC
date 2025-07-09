import { Field, ObjectType } from "@nestjs/graphql";
import { Client } from "../../entities/client.entity";
import { ClientContact } from "../../entities/client-contact.entity";
@ObjectType()
export class ClientContactModel {
    @Field(() => Client)
    client: Client

    @Field(() => [ClientContact])
    contact: [ClientContact]
}