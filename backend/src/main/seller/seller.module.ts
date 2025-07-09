import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { VisitModule } from './visit/visit.module';
import { VisitComentModule } from './visit-coment/visit-coment.module';
import { VisitTypeModule } from './visit-type/visit-type.module';
import { FletesModule } from './fletes/fletes.module';
import { ToolsModule } from './tools/tools.module';
import { DocumentosModule } from './doc/doc.module';

@Module({
  imports: [VisitModule, VisitComentModule,VisitTypeModule, FletesModule,ToolsModule,DocumentosModule]
})
export class SellerModule {}
