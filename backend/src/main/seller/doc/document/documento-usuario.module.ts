import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoUsuario } from './entities/documento-usuario.entity';
import { DocumentoUsuarioService } from './service/documento-usuario.service';
import { DocumentoUsuarioResolver } from './resolver/documento-usuario.resolver';
import { UsersModule } from 'src/security/users/users.module';
import { FilesModule } from 'src/general/files/files.module';
import { TipoDocumentoModule } from '../document-type/tipo-documento.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoUsuario]), UsersModule, FilesModule, TipoDocumentoModule], // Importamos el repositorio de la entidad
  providers: [DocumentoUsuarioService, DocumentoUsuarioResolver], // Servicios y resolvers
  exports: [DocumentoUsuarioService], // Exportamos el servicio si es necesario para otros módulos
})
export class DocumentoUsuarioModule {}
