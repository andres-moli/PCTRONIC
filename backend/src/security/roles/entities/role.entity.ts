import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { RoleFx } from './role-fx.entity';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';
import { UserTypes } from '../../users/enums/user-type.enum';
import { User } from '../../users/entities/user.entity';

@Entity('sec_role')
@ObjectType()
export class Role extends CrudEntity {

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column({ nullable: true })
  @Field(() => UserTypes, { nullable: true })
  defaultForType: UserTypes
  
  @ManyToMany(() => User, (user) => user.roles)
  @Field(() => [User], { nullable: true })
  users: User[];

  @OneToMany(() => RoleFx, (roleFx) => roleFx.role, {cascade: true})
  @Field(() => [RoleFx])
  roleFx: RoleFx[];
}
