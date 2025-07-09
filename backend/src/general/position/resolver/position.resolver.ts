import { Resolver } from "@nestjs/graphql";
import { CrudResolverFrom } from "../../../patterns/crud-pattern/mixins/crud-resolver.mixin";
import { CrudResolverStructure } from "../../../security/auth/utils/crud.utils";
import { AdminOnly } from "../../../security/auth/decorators/user-types.decorator";
import { Public } from "../../../security/auth/decorators/public.decorator";
import { Position } from "../entities/position.entity";
import { PositionService, serviceStructure } from "../service/position.service";


const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType:PositionService,
    create:{ name:'createPositionInput', decorators:[AdminOnly] },
    update:{ name:'updatePositionInput', decorators:[AdminOnly] },
    remove:{ name:'removePosition', decorators:[AdminOnly] },
    findOne:{ name:'position', decorators:[Public] },
    findAll:{ name:'positions', decorators:[Public] },
  })

@Resolver(() => Position)
export class PositionResolver extends CrudResolverFrom(resolverStructure){
  
}