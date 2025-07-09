import { Module } from '@nestjs/common';
import { CertimailsModule } from './certimails/certimails.module';

@Module({
    imports: [CertimailsModule]
})
export class ExternalApiModule {}
