import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RolesFxService, serviceStructure } from '../services/roles-fx.service';
import { RoleFx } from '../entities/role-fx.entity';
import { FunctionalityKeys } from '../roles-fx.functionalities'
import { CreateAndRemoveRoleFxInput } from '../dto/create-and-remove-role-fx.input';
import { CrudResolverStructure } from '../../auth/utils/crud.utils';
import { AdminOnly } from '../../auth/decorators/user-types.decorator';
import { Functionality, FunctionalityResolver } from '../../auth/decorators/functionality.decorator';
import { CrudResolverFrom } from '../../../patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CurrentContext } from '../../../patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';

const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType: RolesFxService,
    findOne:{ name:'roleFx', decorators:[AdminOnly, Functionality(FunctionalityKeys.FIND)] },
    findAll:{ name:'rolesFx', decorators:[AdminOnly, Functionality(FunctionalityKeys.FIND)] }
})

@Resolver(() => RoleFx)
export class RoleFxResolver extends CrudResolverFrom(resolverStructure) {

    @FunctionalityResolver(FunctionalityKeys.CREATE)
    @Mutation(() => [RoleFx], {name: "createRoleFx"})
    @AdminOnly()
    createRoleFx(
      @CurrentContext() context:IContext,
      @Args('createRoleFxInput') createRoleFxInput: CreateAndRemoveRoleFxInput
    ): Promise<RoleFx[]> {
      return this.service.createRoleFx(context, createRoleFxInput);
    }

    @FunctionalityResolver(FunctionalityKeys.REMOVE)
    @Mutation(() => [String], {name: "removeRoleFx"})
    @AdminOnly()
    removeRoleFx(
      @CurrentContext() context:IContext,
      @Args('removeRoleFxInput') removeRoleFxInput: CreateAndRemoveRoleFxInput
    ): Promise<string[]> {
      return this.service.removeRoleFx(context, removeRoleFxInput);
    }

    @FunctionalityResolver(FunctionalityKeys.CREATE)
    @Mutation(() => [RoleFx], {name: "replaceAllRolesFx"})
    @AdminOnly()
    replaceAllRolesFx(
      @CurrentContext() context:IContext,
      @Args('replaceAllRoleFxInput') replaceAllRoleFxInput: CreateAndRemoveRoleFxInput
    ): Promise<RoleFx[]> {
      return this.service.replaceAllRolesFx(context, replaceAllRoleFxInput);
    }
}
