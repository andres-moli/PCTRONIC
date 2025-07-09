import { registerEnumType } from "@nestjs/graphql";

export enum UserTypes {
    User = 'user',
    Admin = 'admin',
    SuperAdmin = 'superAdmin'
}

registerEnumType(UserTypes,{name:'UserTypes'})


export enum TypeWorker {
    externo = 'externo',
    interno = 'interno'
}
registerEnumType(TypeWorker,{name:'TypeWorker'})
