import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { serviceStructure, VisitToolVisittService } from '../service/tool-visit-service';
import { VisitToolUnit } from '../entities/visit-tool-unit.entity';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { CreateVisitToolUnitAllInput, CreateVisitToolUnitInput } from '../dto/input/create-visit-tool-unit.input';
export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:VisitToolVisittService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createToolVisit",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateToolVisit",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeToolVisit",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"ToolVisit",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "ToolsVisits" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => VisitToolUnit)
export class ToolItemVisitResolver extends CrudResolverFrom(resolverStructure) {
      @AnyUser()
      @Mutation(() => String, {name: 'createToolVisitAll'})
      createToolVisitAll(
            @CurrentContext() context: IContext,
            @Args("createVisitToolUnitAllInput") createVisitToolUnitAllInput: CreateVisitToolUnitAllInput
      ){
            return this.service.createAll(context, createVisitToolUnitAllInput)

      }
}
