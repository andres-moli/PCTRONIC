import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchudeleService } from './service/schudele.service';
import { ScheduleResolver } from './resolver/schudele.resolver';
import { Schedule } from './entities/schudele.entity';
import { UsersModule } from 'src/security/users/users.module';

@Module({
  providers: [SchudeleService, ScheduleResolver],
  imports:[
    TypeOrmModule.forFeature([Schedule]),
    UsersModule
  ],
  exports: [SchudeleService]
})
export class SchudeleModule {}
