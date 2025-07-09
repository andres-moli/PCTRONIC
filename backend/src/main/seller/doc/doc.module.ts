import { Module } from '@nestjs/common';
import { TipoDocumentoModule } from './document-type/tipo-documento.module';
import { DocumentoUsuarioModule } from './document/documento-usuario.module';

@Module({
  imports: [
    TipoDocumentoModule, // Importamos el módulo de TipoDocumento
    DocumentoUsuarioModule, // Importamos el módulo de DocumentoUsuario
  ],
  controllers: [],
  providers: [],
})
export class DocumentosModule {}
