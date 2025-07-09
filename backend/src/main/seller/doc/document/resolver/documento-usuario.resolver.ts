import { Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { serviceStructure, DocumentoUsuarioService } from '../service/documento-usuario.service';
import { DocumentoUsuario } from '../entities/documento-usuario.entity';

export const resolverStructure = CrudResolverStructure({
  ...serviceStructure,
  serviceType: DocumentoUsuarioService,
  create: {
    name: 'createDocumentoUsuario',
    decorators: [AnyUser],
  },
  update: {
    name: 'updateDocumentoUsuario',
    decorators: [AnyUser],
  },
  remove: {
    name: 'removeDocumentoUsuario',
    decorators: [AnyUser],
  },
  findOne: {
    name: 'documentoUsuario',
    decorators: [AnyUser],
  },
  findAll: {
    name: 'documentosUsuario',
    decorators: [AnyUser],
  },
  classDecorators: [],
});

@Resolver(() => DocumentoUsuario)
export class DocumentoUsuarioResolver extends CrudResolverFrom(resolverStructure) {}
