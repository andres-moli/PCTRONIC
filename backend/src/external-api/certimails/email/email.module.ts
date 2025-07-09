import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { EmailManagerService } from './service/email.manager.service';
import { EmailService } from './service/email.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [ProfileModule,HttpModule],
  providers: [EmailService,EmailManagerService],
  exports: [EmailService]
})
export class EmailModule {}