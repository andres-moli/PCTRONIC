import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { VisitProjectStatusEnum } from '../emun/visit-project-status.enum';

@Entity({ name: 'cyt_visitProject' })
@ObjectType()
export class VisitProject extends CrudEntity {
    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;

    @Column({default: VisitProjectStatusEnum.PLANNED })
    @Field(() => VisitProjectStatusEnum)
    status: VisitProjectStatusEnum;

    @Column({ type: 'date', nullable: true })
    @Field(() => String, { nullable: true, description: 'Formato: dd/MM/yyyy' })
    endDate?: string;

    @Column({ type: 'date', nullable: true })
    @Field(() => String, { nullable: true, description: 'Formato: dd/MM/yyyy' })
    startDate?: string;

    @Column({ default: false })
    @Field(() => Boolean)
    isCompleted: boolean;
}
