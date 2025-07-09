// enums/estado-documento.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum EstadoDocumento {
  PENDIENTE = 'pendiente',
  ACEPTADO = 'aceptado',
  RECHAZADO = 'rechazado',
}

registerEnumType(EstadoDocumento, {
  name: 'EstadoDocumento',
});
