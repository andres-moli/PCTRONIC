import { registerEnumType } from "@nestjs/graphql";

export enum TypeClientEnum {
    INTEGRADOR = 'integrador',
    DISTRIBUIDOR = 'distribuidor',
    INSTALADOR = 'instalador',
    CLIENTE_FINAL = 'cliente_final'
}

registerEnumType(TypeClientEnum,{name:'TypeClientEnum'})