import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class FletesWithDocument {
  @Field(() => String,{nullable: true})
  numberDocument?: string;

  @Field(() => String,{nullable: true})
  description?: string;

  @Field(() => Float,{nullable: true})
  valueFlete?: number;

  @Field(() => Float,{nullable: true})
  oip?: number;

  @Field(() => Float,{nullable: true})
  backComision?: number;

  @Field(() => String,{nullable: true})
  numberGuia?: string;

  @Field(() => String,{nullable: true})
  carrier?: string;

  @Field(() => String,{nullable: true})
  carrierCell?: string;

  @Field(() => String,{nullable: true})
  contactClient?: string;

  // Campos de la entidad FletesDocument
  @Field(() => String, { nullable: true })
  TEM_CEDULA?: string; // Cedula

  @Field(() => String, { nullable: true })
  TEM_NOMCLI?: string; // Nombre del cliente

  @Field(() => String, { nullable: true })
  TEM_FECHA?: string; // Fecha

  @Field(() => String, { nullable: true })
  TEM_TIPMOV?: string; // Tipo de movimiento

  @Field(() => String, { nullable: true })
  TEM_PREFIJ?: string; // Prefijo

  @Field(() => String, { nullable: true })
  TEM_NUMDOC?: string; // Número de documento

  @Field(() => String, { nullable: true })
  TEM_VENDED?: string; // Vendedor

  @Field(() => String, { nullable: true })
  TEM_VENTA?: string; // Venta

  @Field(() => String, { nullable: true })
  TEM_VALCOS?: string; // Costo

  @Field(() => String, { nullable: true })
  TEM_UTILIDAD?: string; // Utilidad

  @Field(() => String, { nullable: true })
  TEM_PORCENTAJE_UTILIDAD?: string; // Porcentaje de utilidad

  @Field(() => String, { nullable: true })
  CL_DEPART?: string; // Departamento

  @Field(() => String, { nullable: true })
  CLI_CIUDAD?: string; // Ciudad
}
