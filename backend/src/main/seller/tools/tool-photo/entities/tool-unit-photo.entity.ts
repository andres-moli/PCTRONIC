import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { ToolUnit } from '../../tool-item/entities/tool-unit.entity';
import { VisitToolUnit } from '../../tool-visit/entities/visit-tool-unit.entity';
import { FileInfo } from 'src/general/files/entities/file-info.entity';

@Entity({ name: 'tool_unit_photo' })
@ObjectType()
export class ToolUnitPhoto extends CrudEntity {
  @ManyToOne(()=> FileInfo, {lazy: true})
  @Field(() => FileInfo)
  file: FileInfo;

  @ManyToOne(() => VisitToolUnit, vtu => vtu.photos, {lazy: true})
  @Field(() => VisitToolUnit)
  visitToolUnit: VisitToolUnit;
  
  dummy: string
  
}
