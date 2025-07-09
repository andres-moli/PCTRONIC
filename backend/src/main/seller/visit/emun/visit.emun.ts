import { registerEnumType } from "@nestjs/graphql";

export enum StatusVisitEnum {
    programmed = 'programmed',
    confirmed = 'confirmed',
    reprogrammed = 'reprogrammed',
    canceled = 'canceled',
    realized = 'realized',
    initiated = 'initiated', 
}

registerEnumType(StatusVisitEnum,{name:'StatusVisitEnum'})