import { Resolver } from "@nestjs/graphql";
import { CrudResolverFrom } from "../../../patterns/crud-pattern/mixins/crud-resolver.mixin";
import { PageLink } from "../entities/page-link.entity";
import { CrudResolverStructure } from "../../../security/auth/utils/crud.utils";
import { PageLinkService, serviceStructure } from "../service/page-link.service";
import { AdminOnly } from "../../../security/auth/decorators/user-types.decorator";
import { Public } from "../../../security/auth/decorators/public.decorator";


const resolverStructure = CrudResolverStructure({
    ...serviceStructure,
    serviceType:PageLinkService,
    create:{ name:'createPageLinkInput', decorators:[AdminOnly] },
    update:{ name:'updatePageLinkInput', decorators:[AdminOnly] },
    remove:{ name:'removePageLink', decorators:[AdminOnly] },
    findOne:{ name:'pageLink', decorators:[Public] },
    findAll:{ name:'pageLinks', decorators:[Public] },
  })

@Resolver(() => PageLink)
export class PageLinkResolver extends CrudResolverFrom(resolverStructure){
  
}