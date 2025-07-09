import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateDocumentoUsuarioInput } from './create-documento-usuario.input';

@InputType()
export class UpdateDocumentoUsuarioInput extends PartialType(CreateDocumentoUsuarioInput) {
  @Field(() => String)
  id: string;
}
