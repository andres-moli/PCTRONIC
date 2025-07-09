import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { TipoDocumentoService } from './service/tipo-documento.service';
import { TipoDocumentoResolver } from './resolver/tipo-documento.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumento])], // Importamos el repositorio de la entidad
  providers: [TipoDocumentoService, TipoDocumentoResolver], // Servicios y resolvers
  exports: [TipoDocumentoService], // Exportamos el servicio si es necesario para otros módulos
})
export class TipoDocumentoModule {}
