import { Module } from '@nestjs/common';
import { MultikeyRegistersService } from './multikey-registers.service';
import { MultikeyRegistersResolver } from './multikey-registers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultikeyRegister } from './entities/multikey-register.entity';

@Module({
  providers: [MultikeyRegistersResolver, MultikeyRegistersService],
  imports:[TypeOrmModule.forFeature([MultikeyRegister])]
})
export class MultikeyRegistersModule {}
