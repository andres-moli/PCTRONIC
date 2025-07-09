import { Injectable } from '@nestjs/common';
import { CreateMultikeyRegisterInput } from './dto/create-multikey-register.input';
import { UpdateMultikeyRegisterInput } from './dto/update-multikey-register.input';
import { MultikeyRegister } from './entities/multikey-register.entity';
import { CrudServiceStructure } from '../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from '../../patterns/crud-pattern/mixins/crud-service.mixin';

export const serviceStructure = CrudServiceStructure({
  entityType: MultikeyRegister,
  createInputType: CreateMultikeyRegisterInput,
  updateInputType: UpdateMultikeyRegisterInput,
});

@Injectable()
export class MultikeyRegistersService extends CrudServiceFrom(serviceStructure) {
}
