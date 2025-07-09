import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { VisitTypeStatusEnum } from '../emun/visit-type.enum';

@Entity({ name:'cyt_visitType'})
@ObjectType()
export class VisitType extends CrudEntity {
    @Column()
    @Field(() => String)
    name:string;
    
    @Column()
    @Field(() => String)
    description:string;

    @Column({default: VisitTypeStatusEnum.ACTIVE})
    @Field(() => VisitTypeStatusEnum)
    status: VisitTypeStatusEnum
}
