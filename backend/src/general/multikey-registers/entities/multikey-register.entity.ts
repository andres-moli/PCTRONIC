import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { MultikeyRegisterId } from './multikey-register.identifier';
import { AutoIncrement } from '../../../patterns/crud-pattern/decorators/auto-increment.decorator';

@ObjectType()
@Entity("GRL_Register")
@AutoIncrement<MultikeyRegisterId>("id")
export class MultikeyRegister {
  
  @Field( () => MultikeyRegisterId )
  @Column(() => MultikeyRegisterId,{ prefix:'' })
  id: MultikeyRegisterId;

  @Field( () => Date )
  @Column( { name: "RegFec" } )
  date: Date;

  @Field( () => String )
  @Column( { name: "RegDes" } )
  description: string;
}
