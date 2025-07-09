import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { ToolUnit } from '../../tool-item/entities/tool-unit.entity';
import { Visit } from 'src/main/seller/visit/entities/visit.entity';
import { ToolUnitPhoto } from '../../tool-photo/entities/tool-unit-photo.entity';
import { ToolUnitStatusEnum } from '../../tool-item/emun/tool-unit-status.enum';
import { User } from 'src/security/users/entities/user.entity';

@Entity({ name: 'visit_tool_unit' })
@ObjectType()
export class VisitToolUnit extends CrudEntity {
  @ManyToOne(() => Visit, visit => visit.toolUnitsUsed,{lazy: true})
  @Field(() => Visit)
  visit: Visit;

  @ManyToOne(() => ToolUnit, unit => unit.visits,{lazy: true})
  @Field(() => ToolUnit)
  toolUnit: ToolUnit;
  @ManyToOne(() => User, undefined,{lazy: true, nullable: true})
  @Field(() => User, {nullable: true})
  user?: User;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  usageDate: Date;

  @Column({nullable: true })
  @Field(() => ToolUnitStatusEnum, {nullable: true})
  status?: ToolUnitStatusEnum;
  
  @Column({ type: 'timestamp', nullable: true})
  @Field(() => Date, {nullable: true})
  entryDate?: Date;
  @OneToMany(() => ToolUnitPhoto, photo => photo.visitToolUnit, {lazy: true})
  @Field(() => [ToolUnitPhoto], { nullable: true })
  photos: ToolUnitPhoto[];
}
