import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/security/users/users.module';
import { ClientResolver } from './resolvers/client.resolver';
import { ClientService } from './services/client.service';
import { ClientNotificationService } from './services/client.notification.service';
import { Client } from './entities/client.entity';
import { DepartmentModule } from 'src/general/department/department.module';
import { CityModule } from 'src/general/city/city.module';
import { ClientContactService } from './services/client-contact.service';
import { ClientContactResolver } from './resolvers/client-contact.resolver';
import { ClientContact } from './entities/client-contact.entity';
import { MailModule } from 'src/general/email/emial.module';

@Module({
  providers: [ClientResolver, ClientService, ClientNotificationService, ClientContactService, ClientContactResolver],
  imports:[
    TypeOrmModule.forFeature([Client, ClientContact]),
    UsersModule,
    DepartmentModule,
    CityModule,
    MailModule
  ],
  exports: [ClientService]
})
export class ClientModule {}
