import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Client } from '../entities/client.entity';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { ClientContact } from '../entities/client-contact.entity';
import { ClientContactService, serviceStructure } from '../services/client-contact.service';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ClientContactService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createClientContact",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateClientContact",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeClientContact",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"clientContact",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "clientContacts" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => ClientContact)
export class ClientContactResolver extends CrudResolverFrom(resolverStructure) {

}
