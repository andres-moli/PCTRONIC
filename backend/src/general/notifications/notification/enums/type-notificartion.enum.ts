import { registerEnumType } from "@nestjs/graphql";

export enum TypeNotification {
    Email = 'email',
    Sms = 'sms',
    Wss = 'wss',
    Push = 'push',
}

registerEnumType(TypeNotification,{name:'TypeNotification'})