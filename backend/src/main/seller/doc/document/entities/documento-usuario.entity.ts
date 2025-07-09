import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { User } from 'src/security/users/entities/user.entity';
import { TipoDocumento } from '../../document-type/entities/tipo-documento.entity';
import { EstadoDocumento } from '../enum/estado-documento.enum';
import { FileInfo } from 'src/general/files/entities/file-info.entity';

@Entity({ name: 'documento_usuario' })
@ObjectType()
export class DocumentoUsuario extends CrudEntity {
  @ManyToOne(() => User, usuario => usuario.documentos, { lazy: true })
  @Field(() => User)
  usuario: User;

  @ManyToOne(() => TipoDocumento, undefined, { lazy: true })
  @Field(() => TipoDocumento)
  tipoDocumento: TipoDocumento;

  @ManyToOne(() => FileInfo, undefined, {lazy: true})
  @Field(() => FileInfo)
  file: FileInfo;

  @Column({ default: EstadoDocumento.ACEPTADO })
  @Field(() => EstadoDocumento)
  estado: EstadoDocumento;

  @Column({nullable: true })
  @Field(() => String, { nullable: true })
  observaciones?: string;
}
