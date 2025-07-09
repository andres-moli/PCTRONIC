import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTipoDocumentoInput {
  @Field(() => String)
  nombre: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Field(() => Boolean, { defaultValue: false })
  obligatorio?: boolean;
  
  @Field(() => Boolean, { defaultValue: true })
  activo?: boolean;
}
