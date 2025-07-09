import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { VisitTypeService, serviceStructure } from '../service/visit-type.service';
import { VisitType } from '../entities/visit-type.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:VisitTypeService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createVisitType",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateVisitType",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeVisitType",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"visitType",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "visitTypes" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => VisitType)
export class VisitTypeResolver extends CrudResolverFrom(resolverStructure) {

}
