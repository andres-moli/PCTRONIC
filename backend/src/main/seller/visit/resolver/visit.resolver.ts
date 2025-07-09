import { Args, Float, Mutation, Query, Resolver, ID, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { VisitService, serviceStructure } from '../services/visit.service';
import { Visit } from '../entities/visit.entity';
import { Public } from 'src/security/auth/decorators/public.decorator';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { VisitDashboardModel } from '../dto/models/visit.model';
import { UpdateStatusInput } from '../dto/inputs/update-status-visit.dto';
import { User } from 'src/security/users/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { LocationInput, Message, MessageInput } from '../dto/inputs/location.visit.input';
import { VisitComent } from '../../visit-coment/entities/visit-coment.entity';
import { generateWorkedHoursInput } from '../dto/inputs/find-visit-process';
const pubSub = new PubSub();

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:VisitService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createVisit",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateVisit",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeVisit",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"visit",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "visits" ,
            decorators:[AnyUser], 
      },
      findOneArg: {
            name: "visitFindOneArg",
            decorators:[AnyUser]
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Visit)
export class VisitResolver extends CrudResolverFrom(resolverStructure) {
      
      @AnyUser()
      @Query(() => VisitDashboardModel, {name: 'findAllVisitDashboard'})
      findAllVisitDashboard(
            @CurrentContext() context: IContext,
      ){
            return this.service.findAllVisitDashboard(context)
      }
      @AnyUser()
      @Mutation(() => Visit, {name: 'finishVisit'})
      finishVisit(
            @CurrentContext() context: IContext,
            @Args("UpdateStatusInput") updateStatusInput: UpdateStatusInput
      ){
            return this.service.finishVisit(context, updateStatusInput)

      }
      @AnyUser()
      @Query(() => Float)
      async getHoursByVisit(@Args('id', { type: () => ID }) id: string,): Promise<number> {
        return await this.service.getVisitWithTotalHours(id);
      }
      
      @AnyUser()
      @Query(() => [VisitComent])
      async generateWorkedHours(@Args('input', { type: () => generateWorkedHoursInput }) input: generateWorkedHoursInput,): Promise<VisitComent[]> {
        return await this.service.generateWorkedHours(input);
      }
      
      private messages: Message[] = [];

      // Consulta para obtener todos los mensajes
      @Query(() => [Message])
      getMessages() {
        return this.messages;
      }
      @AnyUser()
      // Mutación para enviar un mensaje
      @Mutation(() => Message)
      sendMessage(
        @Args('messageInput') messageInput: MessageInput
      ): Message {
        const newMessage: Message = {
          id: (this.messages.length + 1).toString(),
          senderId: messageInput.senderId,
          content: messageInput.content,
          timestamp: new Date().toISOString(),
        };
        console.log(messageInput)
        this.messages.push(newMessage);
    
        // Emitir el mensaje a todos los suscriptores (receptores)
        pubSub.publish('messageReceived', { messageReceived: newMessage });
    
        return newMessage;
      }
      @AnyUser()
      // Mutación para que un receptor responda a un mensaje
      @Mutation(() => Message)
      sendResponse(
        @Args('messageInput') messageInput: MessageInput,
        @Args('messageId') messageId: string
      ): Message {
        const originalMessage = this.messages.find((msg) => msg.id === messageId);
        if (!originalMessage) {
          throw new Error('Message not found');
        }
    
        const responseMessage: Message = {
          id: (this.messages.length + 1).toString(),
          senderId: messageInput.senderId,
          content: messageInput.content,
          timestamp: new Date().toISOString(),
        };
        this.messages.push(responseMessage);
    
        // Emitir la respuesta a todos los suscriptores (receptores)
        pubSub.publish('messageReceived', { messageReceived: responseMessage });
    
        return responseMessage;
      }
      @AnyUser()
      // Suscripción para recibir mensajes en tiempo real
      @Subscription(() => Message, {
            filter: (payload, variables) => {
                  // Aquí puedes hacer alguna validación si es necesario
                  return payload.senderId === variables.senderId;
                },
                resolve: (payload) => {
                  return payload;  // Asegúrate de que se esté retornando un objeto válido aquí
                },
      })
      messageReceived() {
        return pubSub.asyncIterator('messageReceived');
      }

}
