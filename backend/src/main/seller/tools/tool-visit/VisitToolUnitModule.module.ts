import { forwardRef, Module } from '@nestjs/common';
import { VisitModule } from '../../visit/visit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitToolUnit } from './entities/visit-tool-unit.entity';
import { ToolUnitModule } from '../tool-item/ToolUnitModule.module';
import { ToolUnitPhotoModule } from '../tool-photo/ToolUnitPhotoModule.module';
import { VisitToolVisittService } from './service/tool-visit-service';
import { ToolItemVisitResolver } from './resolver/tool-visit.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitToolUnit]),
    ToolUnitModule,
    forwardRef(()=>ToolUnitPhotoModule),
    forwardRef(()=>VisitModule),
  ],
  providers: [VisitToolVisittService, ToolItemVisitResolver],
  exports: [VisitToolVisittService],
})
export class VisitToolUnitModule {}
