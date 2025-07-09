import { registerEnumType } from "@nestjs/graphql";

export enum RouterType {
    InternaltRoute = "internal route",
    ExternalRoute = "external route",
    InternalRouteWithArguments = "internal route with arguments",
}

registerEnumType(RouterType,{name:'RouterType'})