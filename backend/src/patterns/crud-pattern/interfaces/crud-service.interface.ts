import { DeepPartial, Repository } from "typeorm";

import { IDataEntity } from "./data-entity.interface";
import { IContext } from "../interfaces/context.interface";
import { IDataService } from "../interfaces/data-service.interface";
import { ICreateEventsHandler, IRemoveEventsHandler, IUpdateEventsHandler } from "./event-handlers";
import { IFindArgs } from "./find-args.interface";
import { DefaultArgs } from "../classes/args/default.args";

export interface ICrudService<
        PrimaryKeyType,
        EntityType extends IDataEntity<PrimaryKeyType>,
        CreateInputType extends DeepPartial<EntityType>,
        UpdateInputType extends DeepPartial<EntityType>,
        FindArgsType extends IFindArgs = DefaultArgs,
        ContextType extends IContext = IContext
        > extends IDataService<PrimaryKeyType,EntityType,FindArgsType,ContextType>{
           /**
            * * * Creates a new entity in the database.
            * @param context 
            * @param createInput 
            * @param eventHandler 
            */
            create(
                context:ContextType,
                createInput: CreateInputType,
                eventHandler?:ICreateEventsHandler<PrimaryKeyType,EntityType,CreateInputType,ContextType>
                ): Promise<EntityType>;

            /**
             * * Updates an existing entity in the database.
             * @param context
             *  @param id
             * @param updateInput   
             * @param eventHandler
             * @returns
             */
            update(
                context:ContextType,
                id: PrimaryKeyType, 
                updateInput: UpdateInputType,
                eventHandler?:IUpdateEventsHandler<PrimaryKeyType,EntityType,UpdateInputType,ContextType>
                ): Promise<EntityType>;
            /**
             * * * Removes an entity from the database.
             * @param context 
             * @param id 
             * @param eventHandler 
             */    
            remove(
                context:ContextType,
                id: PrimaryKeyType,
                eventHandler?:IRemoveEventsHandler<PrimaryKeyType,EntityType,ContextType>
                ): Promise<EntityType>;

            /**
             * * Executes before (ANTES) creating an entity.
             * @param context 
             * @param repository 
             * @param entity 
             * @param createInput 
             */    
            beforeCreate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,createInput: CreateInputType) : Promise<void>
            /**
             * * Executes before (ANTES) updating an entity.
             * @param context 
             * @param repository 
             * @param entity 
             * @param updateInput 
             */

            beforeUpdate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,updateInput: UpdateInputType) : Promise<void>
            /**
             * * Executes before (ANTES) removing an entity.
             * @param context 
             * @param repository 
             * @param entity 
             */
            beforeRemove(context:ContextType,repository: Repository<EntityType>,entity: EntityType) : Promise<void>

    
            /**
             * * Executes after (DESPUES) creating an entity.
             * @param context 
             * @param repository 
             * @param entity 
             * @param createInput 
             */
            afterCreate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,createInput: CreateInputType) : Promise<void>
            /**
             * * Executes after (DESPUES) updating an entity.
             * @param context 
             * @param repository 
             * @param entity 
             * @param updateInput 
             */
            afterUpdate(context:ContextType,repository: Repository<EntityType>,entity: EntityType,updateInput: UpdateInputType) : Promise<void>
            /**
             * * Executes after (DESPUES) removing an entity.
             * @param context 
             * @param repository 
             * @param entity 
             */
            afterRemove(context:ContextType,repository: Repository<EntityType>,entity: EntityType) : Promise<void>
        }