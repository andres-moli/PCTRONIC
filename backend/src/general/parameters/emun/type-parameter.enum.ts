import { registerEnumType } from "@nestjs/graphql";

export enum TypeParameterEnum {
    number = 'NUMBER',
    string = 'STRING',
    date = 'DATE',
    file = 'FILE'
}

registerEnumType(TypeParameterEnum,{name:'TypeParameterEnum'})