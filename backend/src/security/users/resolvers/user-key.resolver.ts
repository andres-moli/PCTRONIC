import { Resolver } from '@nestjs/graphql';
import { UsersKeyService, serviceStructure } from '../services/users-key.service';
import { UserKey } from '../entities/user-key.entity';
import { CrudResolverStructure } from '../../auth/utils/crud.utils';
import { CrudResolverFrom } from '../../../patterns/crud-pattern/mixins/crud-resolver.mixin';

const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType: UsersKeyService,
})

@Resolver(() => UserKey)
export class UserKeyResolver extends CrudResolverFrom(resolverStructure) {
}
