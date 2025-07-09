import { Injectable } from '@nestjs/common';
import { FindUserArgs } from '../dto/args/find-users.args';
import { UserKey } from '../entities/user-key.entity';
import { CreateUserKeyInput } from '../dto/inputs/create-user-key.input';
import { UpdateUserKeyInput } from '../dto/inputs/update-user-key.input';
import { User } from '../entities/user.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { checkCodeEvent, registerCodeEvent } from '../constants/events.constants';
import * as moment from 'moment-timezone';
import momentjs from "moment"
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { CrudServiceFrom } from '../../../patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from '../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';


export const serviceStructure = CrudServiceStructure({
  entityType: UserKey,
  createInputType: CreateUserKeyInput,
  updateInputType: UpdateUserKeyInput,
  findArgsType: FindUserArgs,
});

@Injectable()
export class UsersKeyService extends CrudServiceFrom(serviceStructure) {
  async registerCode( context: IContext, code: string, user: User, origin: string ): Promise<boolean> {
    const repository = this.getRepository(context);

    const now = moment.tz('America/Bogota');

    const dateExp = momentjs(now).add(1, 'hour').toString();  
    
    let codeRecord = await repository.findOne({
      where: {
        user: { id: user.id },
        origin
      },
    });
    
    if (!codeRecord) {      
      codeRecord = repository.create({ code, expirationCode: dateExp, user, origin });
    } else {      
      codeRecord.code = code;
      codeRecord.expirationCode = dateExp;
    }

    await repository.save(codeRecord);

    return true;
  }

  async checkCode( context: IContext, code: string, user: User, origin: string ): Promise<boolean> {
    const repository = this.getRepository(context);

    const getRecord = await repository.findOne({
      where: {
        code,
        user: {id: user.id},
        origin
      },
    });

    if (!getRecord) return false;

    const { expirationCode } = getRecord;

    const now = momentjs().utcOffset('-05:00');

    const expirationMoment = momentjs(expirationCode).utcOffset('-05:00');

    if (now > expirationMoment) return false;
    
    return true;
  }

  @OnEvent(registerCodeEvent)
  async onRegisterCode({
    context,
    code,
    user,
    origin
  }: {
    context: IContext;
    code: string;
    user: User;
    origin: string;
  }): Promise<boolean> {
    return this.registerCode(context, code, user, origin);
  }

  @OnEvent(checkCodeEvent)
  async onCheckCode({
    context,
    code,
    user,
    origin
  }: {
    context: IContext;
    code: string;
    user: User;
    origin: string;
  }): Promise<boolean> {
    return this.checkCode(context, code, user, origin);
  }
}
