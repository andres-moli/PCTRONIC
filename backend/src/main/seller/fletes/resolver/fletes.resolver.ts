import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { FletesService, serviceStructure } from '../service/fletes.service';
import { Fletes } from '../entities/fletes.entity';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { FacturaPorClienteDto } from '../dto/inputs/find-fletes.input';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { FacturaResponseModel, findOneFacturaClienteByCode } from '../dto/model/fletes.module';
import { FletesWithDocument } from '../dto/model/fletesDcoument.module';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:FletesService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createFletes",
            decorators:[Public],
      },
      update:{ 
            name:"updateFletes",
            decorators:[Public],
      },
      remove:{ 
            name:"removeFletes",
            decorators:[Public],
      },
      findOne: { 
            name:"Fletes",
            decorators:[Public], 
      },
      findAll: { 
            name: "Fletess" ,
            decorators:[Public], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Fletes)
export class FletesResolver extends CrudResolverFrom(resolverStructure) {
      @Public()
      @Query((returns)=> [FletesWithDocument], {name: 'findAllFacturaCliente'})
      findAllFacturaCliente(
            @Args('input', {type: ()=> FacturaPorClienteDto, name:'inputFacturaClient' }) args:FacturaPorClienteDto,
            @CurrentContext() context: IContext,
      ){
            return this.service.findAllFacturaCliente(context,args)
      }

      @Public()
      @Query((returns)=> findOneFacturaClienteByCode, {name: 'findOneFacturaClienteByCode'})
      async findOneFacturaClienteByCode(
            @Args('code', {type: ()=> String, name:'inputfindOneFacturaClienteByCodet' }) code: string,
            @CurrentContext() context: IContext,
      ){
            const findOne = await this.service.findOneByCode(context,code);
            return {
                  isFound: findOne ? true : false,
                  flete: findOne
            }
      }
}
