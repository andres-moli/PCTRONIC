import { Injectable } from '@nestjs/common';
import { RoleFx } from '../entities/role-fx.entity';
import { CreateAndRemoveRoleFxInput } from '../dto/create-and-remove-role-fx.input';
import { UpdateRoleFxInput } from '../dto/update-role-fx.input';
import { Role } from '../entities/role.entity';
import { CrudServiceStructure } from '../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from '../../../patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';

export const serviceStructure = CrudServiceStructure({
  entityType: RoleFx,
  createInputType: CreateAndRemoveRoleFxInput,
  updateInputType: UpdateRoleFxInput,
});


@Injectable()
export class RolesFxService extends CrudServiceFrom(serviceStructure) {

  async createNewRolesFx(permissions: any, repository: any, role: Role) {
    const newRolesFx = [];

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      
      const validateRoleFx = await repository
        .createQueryBuilder('roleFx')
        .where('roleFx.permission = :permission', { permission })
        .andWhere('roleFx.role = :roleId', { roleId: role })
        .getOne();
      
      if(!validateRoleFx) {
        const newRoleFx = repository.create({permission, role})

        await repository.save(newRoleFx);

        newRolesFx.push(newRoleFx);
      }
    }
    return newRolesFx;
  }

  async createRoleFx(context: IContext, createRoleFxInput: CreateAndRemoveRoleFxInput): Promise<RoleFx[]>  {
    const repository = this.getRepository(context);

    const { permissions, role } = createRoleFxInput;

    const newRolesFx = await this.createNewRolesFx(permissions, repository, role);

    return newRolesFx;
  }

  async removeRoleFx(context: IContext, createRoleFxInput: CreateAndRemoveRoleFxInput): Promise<string[]>  {
    const repository = this.getRepository(context);

    const { permissions, role } = createRoleFxInput;

    const eliminatedRolesFx = [];

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      
      const validateRoleFx = await repository
        .createQueryBuilder('roleFx')
        .where('roleFx.permission = :permission', { permission })
        .andWhere('roleFx.role = :roleId', { roleId: role })
        .getOne();
      
      if(validateRoleFx) {
        await repository.remove(validateRoleFx);

        eliminatedRolesFx.push(permission);
      }
    }
    return eliminatedRolesFx;
  }

  async replaceAllRolesFx(context: IContext, replaceAllFxInput: CreateAndRemoveRoleFxInput): Promise<RoleFx[]> {
    const repository = this.getRepository(context);

    const { permissions, role } = replaceAllFxInput;

    const rolesFx = await repository.createQueryBuilder('roleFx')
    .where('roleFx.role = :roleId', { roleId: role })
    .getMany();

    await repository.remove(rolesFx);

    const newRolesFx = await this.createNewRolesFx(permissions, repository, role);

    return newRolesFx; 
  }
}
