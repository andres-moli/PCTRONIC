import { Resolver } from '@nestjs/graphql';
import { MultikeyRegistersService, serviceStructure } from './multikey-registers.service';
import { MultikeyRegister } from './entities/multikey-register.entity';
import { MultikeyRegisterId } from './entities/multikey-register.identifier';
import { AdminOnly } from '../../security/auth/decorators/user-types.decorator';
import { CrudResolverStructure } from '../../security/auth/utils/crud.utils';
import { Public } from '../../security/auth/decorators/public.decorator';
import { CrudResolverFrom } from '../../patterns/crud-pattern/mixins/crud-resolver.mixin';

export const resolverStructure = CrudResolverStructure({
  ...serviceStructure,
  serviceType:MultikeyRegistersService,
  //if you want to disable any crud method just comment one of the following lines
  create:{ 
        name:"createMultiKeyRegister",
        decorators:[AdminOnly],
  },
  update:{ 
        name:"updateMultiKeyRegister",
        decorators:[AdminOnly],
  },
  remove:{ 
        name:"removeMultiKeyRegister",
        decorators:[AdminOnly],
  },
  findOne: { 
        name:"multiKeyRegister",
        decorators:[Public], 
  },
  findAll: { 
        name: "multiKeyRegisters" ,
        decorators:[Public], 
  },
  primaryKey:{
    type:MultikeyRegisterId
  }
})

@Resolver(() => MultikeyRegister)
export class MultikeyRegistersResolver extends CrudResolverFrom(resolverStructure) {

}
