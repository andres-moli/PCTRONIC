import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/security/users/users.module';
import { VisitResolver } from './resolver/visit.resolver';
import { VisitService } from './services/visit.service';
import { Visit } from './entities/visit.entity';
import { ClientModule } from '../client/client.module';
import { ParameterModule } from 'src/general/parameters/parameter.module';
import { VisitTypeModule } from '../visit-type/visit-type.module';
import { MailModule } from 'src/general/email/emial.module';
import { VisitController } from './controller/visit.controller';
import { HttpModule } from '@nestjs/axios';
import { VisitComentModule } from '../visit-coment/visit-coment.module';
import { VisitToolUnitModule } from '../tools/tool-visit/VisitToolUnitModule.module';


@Module({
  providers: [VisitResolver, VisitService],
  imports:[
    TypeOrmModule.forFeature([Visit]),
    forwardRef(()=>UsersModule),
    ClientModule,
    ParameterModule,
    VisitTypeModule,
    MailModule,
    HttpModule,
    VisitComentModule,
    forwardRef(()=> VisitToolUnitModule)
  ],
  controllers: [VisitController],
  exports: [VisitService]
})
export class VisitModule {}
