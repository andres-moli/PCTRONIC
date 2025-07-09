import { registerEnumType } from "@nestjs/graphql";

export enum VisitComentTypeEnum {
    INICIO = 'INICIO',
    FIN = 'FIN',
    INTERMEDIO = 'INTERMEDIO', 
}
export enum VisitComentStatusEnum {
    PENDINIG = 'pendinig',
    CANCELED = 'canceled',
    REALIZED = 'realized'
}
registerEnumType(VisitComentTypeEnum,{name:'VisitComentTypeEnum'})
registerEnumType(VisitComentStatusEnum,{name:'VisitComentStatusEnum'})
