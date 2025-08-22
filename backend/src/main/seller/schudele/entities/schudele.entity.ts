import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { WeekDay } from '../emun/schudele.enum';
import { User } from 'src/security/users/entities/user.entity';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { DateResolver } from 'graphql-scalars';
@Entity({name: 'cyt_schedule'})
@ObjectType()
export class Schedule extends CrudEntity {

  @Column()
  @Field(() => WeekDay)
  day: WeekDay;

  @Column({type: 'date'})
  @Index()
  @Field(() => DateResolver)
  date: Date;
  
  @Column({nullable: true })
  @Field(() => String, { nullable: true })  
  description?: string;

  @Column({ type: 'time', nullable: true })
  @Field(() => String, { nullable: true })  
  startTime: string;

  @Column({ type: 'time', nullable: true })
  @Field(() => String, { nullable: true })
  endTime: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isDayOff: boolean;

  @ManyToOne(() => User, undefined, { lazy: true })
  @Field(() => User)
  user: User;
}
