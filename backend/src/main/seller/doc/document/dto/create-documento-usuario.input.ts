import { InputType, Field } from '@nestjs/graphql';
import { EstadoDocumento } from '../enum/estado-documento.enum';

@InputType()
export class CreateDocumentoUsuarioInput {
  @Field(() => String)
  usuarioId: string;

  @Field(() => String)
  tipoDocumentoId: string;

  @Field(() => String)
  fileId: string;

  @Field(() => EstadoDocumento, { defaultValue: EstadoDocumento.PENDIENTE })
  estado?: EstadoDocumento;

  @Field(() => String, { nullable: true })
  observaciones?: string;
}
