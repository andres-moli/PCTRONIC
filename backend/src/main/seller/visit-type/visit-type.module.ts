import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitModule } from '../visit/visit.module';
import { VisitTypeService } from './service/visit-type.service';
import { VisitTypeResolver } from './resolver/visit-type.resolver';
import { VisitType } from './entities/visit-type.entity';



@Module({
  providers: [VisitTypeService, VisitTypeResolver],
  imports:[
    TypeOrmModule.forFeature([VisitType]),
  ],
  exports: [VisitTypeService]
})
export class VisitTypeModule {}
