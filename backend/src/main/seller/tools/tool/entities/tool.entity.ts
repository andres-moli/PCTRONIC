import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { ToolUnit } from '../../tool-item/entities/tool-unit.entity';

@Entity({ name: 'tool' })
@ObjectType()
export class Tool extends CrudEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  reference: string;

  @OneToMany(() => ToolUnit, unit => unit.tool, {lazy: true})
  @Field(() => [ToolUnit], { nullable: true })
  units: ToolUnit[];
}
