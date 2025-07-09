import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { serviceStructure, ToolUnitService } from '../service/tool-item-service';
import { ToolUnit } from '../entities/tool-unit.entity';
export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ToolUnitService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createToolItem",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateToolItem",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeToolItem",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"ToolItem",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "ToolsItems" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => ToolUnit)
export class ToolItemResolver extends CrudResolverFrom(resolverStructure) {

}
