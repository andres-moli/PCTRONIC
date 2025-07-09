import { registerEnumType } from "@nestjs/graphql";

export enum NotificationTypes {
    Token = 'token',
}

registerEnumType(NotificationTypes,{name:'NotificationType'})