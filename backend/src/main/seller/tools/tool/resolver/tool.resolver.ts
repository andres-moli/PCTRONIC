import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { serviceStructure, ToolService } from '../service/tool-service';
import { Tool } from '../entities/tool.entity';
export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ToolService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createTool",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateTool",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeTool",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Tool",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "Tools" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Tool)
export class ToolResolver extends CrudResolverFrom(resolverStructure) {

}
