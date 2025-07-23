import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { VisitProjectService, serviceStructure } from '../service/visit-project.service';
import { VisitProject } from '../entities/visit-project.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:VisitProjectService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createProjectVist",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateProjectVist",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeProjectVist",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"projectVist",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "projectVists" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => VisitProject)
export class VisitProjectResolver extends CrudResolverFrom(resolverStructure) {

}
