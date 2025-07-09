import { Module } from '@nestjs/common';
import { FunctionalityResolver } from './resolvers/functionality.resolver';

@Module({
  imports:[],
  providers: [FunctionalityResolver],
  exports:[]
})
export class FunctionalityModule {}
