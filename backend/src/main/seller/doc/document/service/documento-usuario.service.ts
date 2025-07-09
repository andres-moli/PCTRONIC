import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { DocumentoUsuario } from '../entities/documento-usuario.entity';
import { CreateDocumentoUsuarioInput } from '../dto/create-documento-usuario.input';
import { UpdateDocumentoUsuarioInput } from '../dto/update-documento-usuario.input';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';
import { FilesService } from 'src/general/files/services/files.service';
import { TipoDocumentoService } from '../../document-type/service/tipo-documento.service';
import { FindDocArgs } from '../dto/find-doc.args';

export const serviceStructure = CrudServiceStructure({
  entityType: DocumentoUsuario,
  createInputType: CreateDocumentoUsuarioInput,
  updateInputType: UpdateDocumentoUsuarioInput,
  findArgsType: FindDocArgs
});

@Injectable()
export class DocumentoUsuarioService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FilesService,
    private readonly tipoDocumentoService: TipoDocumentoService
  ) {
    super();
  }
  async beforeCreate(context: IContext, repository: Repository<DocumentoUsuario>, entity: DocumentoUsuario, createInput: CreateDocumentoUsuarioInput): Promise<void> {
      entity.file = await this.fileService.findOne(context,createInput.fileId,true)
      entity.usuario = await this.usersService.findOne(context,createInput.usuarioId,true)
      entity.tipoDocumento = await this.tipoDocumentoService.findOne(context,createInput.tipoDocumentoId,true)
  }
  async beforeUpdate(
    context: IContext,
    repository: Repository<DocumentoUsuario>,
    entity: DocumentoUsuario,
    updateInput: UpdateDocumentoUsuarioInput
  ): Promise<void> {
    if (updateInput.fileId) {
      entity.file = await this.fileService.findOne(context, updateInput.fileId, true);
    }
  
    // Nota: Si no permites cambiar de usuario, puedes omitir esta parte
    if (updateInput.usuarioId) {
      entity.usuario = await this.usersService.findOne(context, updateInput.usuarioId, true);
    }
  
    if (updateInput.tipoDocumentoId) {
      entity.tipoDocumento = await this.tipoDocumentoService.findOne(context, updateInput.tipoDocumentoId, true);
    }
  }
  
}
