import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitModule } from '../visit/visit.module';
import { FletesService } from './service/fletes.service';
import { FletesResolver } from './resolver/fletes.resolver';
import { Fletes } from './entities/fletes.entity';
import { HttpModule } from '@nestjs/axios';
import { FletesDocument } from './entities/documentFletes.entity';



@Module({
  providers: [FletesService, FletesResolver],
  imports:[
    TypeOrmModule.forFeature([Fletes,FletesDocument]),
    HttpModule
  ],
  exports: [FletesService]
})
export class FletesModule {}
