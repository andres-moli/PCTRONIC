import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditModule } from './audit/audit.module';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { FunctionalityModule } from './functionality/functionality.module';

@Module({
  imports: [UsersModule, AuthModule, AuditModule, RolesModule, GroupsModule, FunctionalityModule]
})
export class SecurityModule {}
