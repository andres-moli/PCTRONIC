import { ObjectType, Field, ResolveField } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { FileModes } from '../enums/file-modes.enum';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';

@Entity('grl_file')
@ObjectType()
export class FileInfo extends CrudEntity {
  
  @Column()
  @Field(() => String) 
  fileName: string;

  @Column()
  @Field(() => String)
  fileExtension: string;

  @Column()
  @Field(() => FileModes)
  fileMode: FileModes;

  @Column('bytea', { nullable: true, select:false  })
  fileBuffer?: Buffer;

  @Column({ nullable: true })
  @Field(() => String, {nullable: true})
  fileMongoId?: string;

  
  @Column({ nullable: true })
  @Field(() => String, {nullable: true})
  fileUrl?: string;

  @Column({ nullable: true, default: false })
  @Field(() => Boolean, {nullable: true})
  isFireBase?: boolean;

  
}
