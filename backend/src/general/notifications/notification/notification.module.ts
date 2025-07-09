import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { NotificationService } from './services/notification.service';
import { Notification } from './entities/notification.entity';
import { NotificationResolver } from './resolvers/notification.resolver';
import { notificationProcessor } from './constants/events.constants';
import { NotificationConsumer } from './consumers/notification.consumer';
import { ProfileModule } from '../../../external-api/certimails/profile/profile.module';
import { EmailModule } from '../../../external-api/certimails/email/email.module';
import { SmsModule } from '../../../external-api/certimails/sms/sms.module';
import { UsersModule } from '../../../security/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]), 
    HttpModule, 
    ProfileModule, 
    EmailModule,
    SmsModule,
    UsersModule,
    BullModule.registerQueue({
      name: notificationProcessor
    }),
  ],
  providers: [
    NotificationService,
    NotificationResolver,
    NotificationConsumer
  ],
  exports: [
    NotificationService
  ]
})
export class NotificationModule {}