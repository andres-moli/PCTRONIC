import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum FunctionalityTag {
    STANDARD = 'STANDARD',
    CUSTOM = 'CUSTOM',
    METHOD = 'METHOD',
    RESOLVER = 'RESOLVER',
    CONTROLLER = 'CONTROLLER',
    MODULE = 'MODULE',
    PARENT = 'PARENT',
}

registerEnumType(FunctionalityTag, {
    name: 'FunctionalityTag',
});

@ObjectType()
export class FunctionalityModel {
    constructor(any: any) {
        const { name, key, description, tags, ...children } = any;
        this.name = name;
        this.key = key;
        this.description = description;
        this.tags = tags;
        this.children = Object.values(children);
    }

    @Field()
    name: string;
    
    @Field()
    key: string;
    
    @Field({ nullable: true })
    description?: string;
    
    @Field(() => [FunctionalityTag], { nullable: true })
    tags?: FunctionalityTag[];
    
    @Field(() => [FunctionalityModel], { nullable: true })
    children?: FunctionalityModel[];
}