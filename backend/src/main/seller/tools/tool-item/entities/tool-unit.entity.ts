import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Tool } from '../../tool/entities/tool.entity';
import { ToolUnitPhoto } from '../../tool-photo/entities/tool-unit-photo.entity';
import { VisitToolUnit } from '../../tool-visit/entities/visit-tool-unit.entity';
import { ToolUnitStatusEnum } from '../emun/tool-unit-status.enum';

@Entity({ name: 'tool_unit' })
@ObjectType()
export class ToolUnit extends CrudEntity {
  @Column()
  @Field(() => String)
  name: string;
  
  @ManyToOne(() => Tool, tool => tool.units, {lazy: true})
  @Field(() => Tool)
  tool: Tool;

  @Column({default: ToolUnitStatusEnum.AVAILABLE })
  @Field(() => ToolUnitStatusEnum)
  status: ToolUnitStatusEnum;

  @OneToMany(() => VisitToolUnit, vtu => vtu.toolUnit, {lazy: true})
  @Field(() => [VisitToolUnit], { nullable: true })
  visits: VisitToolUnit[];
}
