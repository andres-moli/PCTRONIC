import { Resolver } from "@nestjs/graphql";
import { CrudResolverFrom } from "../../../patterns/crud-pattern/mixins/crud-resolver.mixin";
import { CrudResolverStructure } from "../../../security/auth/utils/crud.utils";
import { AdminOnly } from "../../../security/auth/decorators/user-types.decorator";
import { Public } from "../../../security/auth/decorators/public.decorator";
import { Parameter } from "../entities/parameter.entity";
import { ParameterService, serviceStructure } from "../service/parameter.service";


const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType:ParameterService,
    create:{ name:'createParameter', decorators:[AdminOnly] },
    update:{ name:'updateParameter', decorators:[AdminOnly] },
    remove:{ name:'removeParameter', decorators:[AdminOnly] },
    findOne:{ name:'parameter', decorators:[Public] },
    findAll:{ name:'parameters', decorators:[Public] },
  })

@Resolver(() => Parameter)
export class ParameterResolver extends CrudResolverFrom(resolverStructure){
  
}