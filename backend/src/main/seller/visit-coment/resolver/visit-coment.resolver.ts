import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { VisitComentService, serviceStructure } from '../services/visit-coment.service';
import { VisitComent } from '../entities/visit-coment.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:VisitComentService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createVisitComent",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateVisitComent",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeVisitComent",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"visitComent",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "visitComents" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => VisitComent)
export class VisitComentResolver extends CrudResolverFrom(resolverStructure) {

}
