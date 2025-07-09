import { registerEnumType } from "@nestjs/graphql";

export enum VisitTypeStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

registerEnumType(VisitTypeStatusEnum,{name:'VisitTypeStatusEnum'})