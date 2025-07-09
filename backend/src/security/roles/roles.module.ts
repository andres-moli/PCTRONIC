import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './services/roles.service';
import { RolesResolver } from './resolvers/roles.resolver';
import { Role } from './entities/role.entity';
import { RoleFx } from './entities/role-fx.entity';
import { RoleFxResolver } from './resolvers/role-fx.resolver';
import { RolesFxService } from './services/roles-fx.service';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { MailModule } from 'src/general/email/emial.module';

@Module({
  providers: [RolesResolver, RolesService, RoleFxResolver, RolesFxService, AuthService, ],
  imports:[
    TypeOrmModule.forFeature([Role, RoleFx]), UsersModule, MailModule
  ]
})
export class RolesModule {}
