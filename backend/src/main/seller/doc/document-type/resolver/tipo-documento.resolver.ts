import { Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { serviceStructure, TipoDocumentoService } from '../service/tipo-documento.service';
import { TipoDocumento } from '../entities/tipo-documento.entity';

export const resolverStructure = CrudResolverStructure({
  ...serviceStructure,
  serviceType: TipoDocumentoService,
  create: {
    name: 'createTipoDocumento',
    decorators: [AnyUser],
  },
  update: {
    name: 'updateTipoDocumento',
    decorators: [AnyUser],
  },
  remove: {
    name: 'removeTipoDocumento',
    decorators: [AnyUser],
  },
  findOne: {
    name: 'tipoDocumento',
    decorators: [AnyUser],
  },
  findAll: {
    name: 'tiposDocumento',
    decorators: [AnyUser],
  },
  classDecorators: [],
});

@Resolver(() => TipoDocumento)
export class TipoDocumentoResolver extends CrudResolverFrom(resolverStructure) {}
