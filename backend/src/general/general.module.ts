import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { DummyModule } from './dummy/dummy.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationConfigModule } from './notifications/notification-config/notification-config.module';
import { NotificationGroupModule } from './notifications/notification-group/notification-group.module';
import { IdentificationModule } from './identification/identification.module';
import { CityModule } from './city/city.module';
import { DepartmentModule } from './department/department.module';
import { DocumentTypeModule } from './documentType/documentType.module';
import { CountryModule } from './country/country.module';
import { PageLinkModule } from './pageLink/pageLink.module';
import { MultikeyRegistersModule } from './multikey-registers/multikey-registers.module';
import { PositionModule } from './position/position.module';
import { ParameterModule } from './parameters/parameter.module';
import { MailModule } from './email/emial.module';

@Module({
  imports: [FilesModule, DummyModule, NotificationsModule, NotificationConfigModule, NotificationGroupModule, 
    IdentificationModule, CityModule, DepartmentModule, DocumentTypeModule, CountryModule, PageLinkModule, MultikeyRegistersModule, PositionModule, ParameterModule, MailModule]
})
export class GeneralModule {}