import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { TipoDocumento } from '../entities/tipo-documento.entity';
import { CreateTipoDocumentoInput } from '../dto/create-tipo-documento.input';
import { UpdateTipoDocumentoInput } from '../dto/update-tipo-documento.input';

export const serviceStructure = CrudServiceStructure({
  entityType: TipoDocumento,
  createInputType: CreateTipoDocumentoInput,
  updateInputType: UpdateTipoDocumentoInput,
});

@Injectable()
export class TipoDocumentoService extends CrudServiceFrom(serviceStructure) {
  constructor() {
    super();
  }
}
