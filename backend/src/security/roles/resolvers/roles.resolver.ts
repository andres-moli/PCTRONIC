import { Mutation, Resolver } from '@nestjs/graphql';
import { RolesService, serviceStructure } from '../services/roles.service';
import { Role } from '../entities/role.entity';
import {FunctionalityKeys} from '../roles.functionalities';
import { CrudResolverStructure } from '../../auth/utils/crud.utils';
import { AdminOnly, SuperAdminOnly } from '../../auth/decorators/user-types.decorator';
import { Functionality } from '../../auth/decorators/functionality.decorator';
import { CrudResolverFrom } from '../../../patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CurrentContext } from '../../../patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';

const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType:RolesService,
    create:{ name:'createRole', decorators:[AdminOnly, Functionality(FunctionalityKeys.CREATE)] },
    update:{ name:'updateRole', decorators:[AdminOnly, Functionality(FunctionalityKeys.UPDATE)] },
    remove:{ name:'removeRole', decorators:[AdminOnly, Functionality(FunctionalityKeys.REMOVE)] },
    findOne:{ name:'role', decorators:[AdminOnly, Functionality(FunctionalityKeys.FIND)] },
    findAll:{ name:'roles', decorators:[AdminOnly, Functionality(FunctionalityKeys.FIND)] }
})

@Resolver(() => Role)
export class RolesResolver extends CrudResolverFrom(resolverStructure) {

    @Mutation(() => [Role], {name: "createDefaultRoles"})
    @SuperAdminOnly()
    createDefaultRoles(
      @CurrentContext() context:IContext
    ): Promise<Role[]> {
      return this.service.createDefaultRoles(context);
    }
}
