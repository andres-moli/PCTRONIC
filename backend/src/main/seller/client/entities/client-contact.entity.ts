import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Client } from './client.entity';

@Entity({ name:'cyt_clientContact'})
@ObjectType()
export class ClientContact extends CrudEntity {

    @Column()
    @Field(() => String )
    name:string;

    @Column()
    @Field(() => String)
    celular:string;

    @Column()
    @Field(() => String)
    email:string;

    @Column()
    @Field(() => String)
    position: string
  
    @Column({nullable: true})
    @Field(() => String, {nullable: true})
    telefono?:string;

    @ManyToOne( () => Client, (country) => country.id ,{ lazy: true, nullable: true})  
    @Field(() => Client, {nullable: true}) 
    client: Client;
}
