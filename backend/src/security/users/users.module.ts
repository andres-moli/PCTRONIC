import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersNotificationService } from './services/users.notification.service';
import { AuthService } from '../auth/auth.service';
import { UserKey } from './entities/user-key.entity';
import { UsersKeyService } from './services/users-key.service';
import { UserKeyResolver } from './resolvers/user-key.resolver';
import { MailModule } from 'src/general/email/emial.module';
@Module({
  imports:[    
    TypeOrmModule.forFeature([User, UserKey]),
    MailModule
  ],
  providers: [
    UsersResolver, 
    UsersService,
    UsersNotificationService,
    AuthService,
    UsersKeyService,
    UserKeyResolver,
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
