import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTipoDocumentoInput } from './create-tipo-documento.input';

@InputType()
export class UpdateTipoDocumentoInput extends PartialType(CreateTipoDocumentoInput) {
  @Field(() => String)
  id: string; // o número si usas ID numérico
}
