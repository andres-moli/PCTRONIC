import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { SchudeleService, serviceStructure } from '../service/schudele.service';
import { Schedule } from '../entities/schudele.entity';
export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType: SchudeleService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createSchudele",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateSchudele",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeSchudele",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"schudele",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "schudeles",
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Schedule)
export class ScheduleResolver extends CrudResolverFrom(resolverStructure) {

}
