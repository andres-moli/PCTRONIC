import { registerEnumType } from "@nestjs/graphql";

export enum BodyType {
    Custom = 'CUSTOM',
    Code = 'CODE'
}

registerEnumType(BodyType,{name:'BodyType'})

export enum RecipientType {
    Destinatary = 'DESTINATARIO',
    Cc = 'CC',
    Bcc = 'BCC',
}

registerEnumType(RecipientType,{name:'RecipientType'})