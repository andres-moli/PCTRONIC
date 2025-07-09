import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { VisitTypeStatusEnum } from '../emun/visit-type.enum';

@Entity({ name:'cyt_fletes'})
@ObjectType()
export class Fletes extends CrudEntity {
    @Column()
    @Field(() => String)
    numberDocument:string;
    
    @Column()
    @Field(() => String)
    description:string;

    @Column()
    @Field(() => Float)
    valueFlete: number;

            
    @Column()
    @Field(() => Float)
    oip: number;

    @Column()
    @Field(() => Float)
    backComision: number;

    @Column()
    @Field(() => String)
    numberGuia:string;

    @Column()
    @Field(() => String)
    carrier:string;

    @Column()
    @Field(() => String)
    carrierCell:string;

    
    @Column()
    @Field(() => String)
    contactClient:string;

}
