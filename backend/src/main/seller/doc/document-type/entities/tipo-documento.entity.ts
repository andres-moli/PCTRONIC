import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';

@Entity({ name: 'doc_tipo_documento' })
@ObjectType()
export class TipoDocumento extends CrudEntity {
  @Column()
  @Field(() => String)
  nombre: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Column({ default: false })
  @Field(() => Boolean)
  obligatorio: boolean;

  @Column({ default: true })
  @Field(() => Boolean)
  activo: boolean;
}
