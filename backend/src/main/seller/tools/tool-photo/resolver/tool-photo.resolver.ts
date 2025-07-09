import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { serviceStructure, VisitToolUnitPhotoService } from '../service/tool-photo-service';
import { ToolUnitPhoto } from '../entities/tool-unit-photo.entity';
export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:VisitToolUnitPhotoService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createToolPhoto",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateToolPhoto",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeToolPhoto",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"ToolPhoto",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "ToolsPhotos" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => ToolUnitPhoto)
export class ToolItemPhotoResolver extends CrudResolverFrom(resolverStructure) {

}
