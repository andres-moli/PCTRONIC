import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitProjectService } from './service/visit-project.service';
import { VisitProjectResolver } from './resolver/visit-project.resolver';
import { VisitProject } from './entities/visit-project.entity';



@Module({
  providers: [VisitProjectService, VisitProjectResolver],
  imports:[
    TypeOrmModule.forFeature([VisitProject]),
  ],
  exports: [VisitProjectService]
})
export class VisitProjectModule {}
