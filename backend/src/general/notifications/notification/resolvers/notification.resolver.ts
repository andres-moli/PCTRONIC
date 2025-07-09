import { Resolver } from '@nestjs/graphql';
import { Notification } from '../entities/notification.entity';
import { NotificationService, serviceStructure } from '../services/notification.service';
import { CrudResolverStructure } from '../../../../security/auth/utils/crud.utils';
import { AdminOnly } from '../../../../security/auth/decorators/user-types.decorator';
import { Public } from '../../../../security/auth/decorators/public.decorator';
import { CrudResolverFrom } from '../../../../patterns/crud-pattern/mixins/crud-resolver.mixin';

const resolverStructure = CrudResolverStructure({
  ...serviceStructure,
  serviceType:NotificationService,
  create:{ name:'createNotification', decorators:[AdminOnly] },
  update:{ name:'updateNotification', decorators:[AdminOnly] },
  remove:{ name:'removeNotification', decorators:[AdminOnly] },
  findOne:{ name:'notification', decorators:[Public] },
  findAll:{ name:'notifications', decorators:[Public] },
})

@Resolver(() => Notification)
export class NotificationResolver extends CrudResolverFrom(resolverStructure) {
  
}