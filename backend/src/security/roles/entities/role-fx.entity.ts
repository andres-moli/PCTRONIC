import { Role } from './role.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';
  
@Entity({ name: 'sec_rolefx', })
@ObjectType()
  export class RoleFx extends CrudEntity {
  
    @Column({ length: '200' })
    @Field()
    permission: string;
  
    @ManyToOne(() => Role, (role) => role.id)
    @JoinColumn()
    @Field(() => Role, { nullable: true })
    role?: Role;
  }
  