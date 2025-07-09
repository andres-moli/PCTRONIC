import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleInput } from '../dto/create-role.input';
import { UpdateRoleInput } from '../dto/update-role.input';
import { Role } from '../entities/role.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { validateRoleEvent } from '../constants/events.contants';
import { CrudServiceStructure } from '../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from '../../../patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { UserTypes } from '../../users/enums/user-type.enum';

export const serviceStructure = CrudServiceStructure({
  entityType:Role,
  createInputType:CreateRoleInput,
  updateInputType:UpdateRoleInput,
});


@Injectable()
export class RolesService extends CrudServiceFrom(serviceStructure) {

  async findOneById(context:IContext,id: string, orFail?:boolean): Promise<Role> {
    
    const repository = this.getRepository(context);

    const role = await repository.findOneBy({ id });

    if (orFail && !role) throw new NotFoundException(`Role with id: ${id} not found`);

    return role;
  }

  async createDefaultRoles(context:IContext): Promise<Role[]>{
    const roles = [
      {
        name: "User Default",
        description: "User Default",
        defaultForType: UserTypes.User,
        roleFx: [
          { permission: "security.users.find" },
          { permission: "security.users.update" },
        ],
      },
      {
        name: "Admin Default",
        description: "Admin Default",
        defaultForType: UserTypes.Admin,
        roleFx: [
          { permission: "security.users.create" },
          { permission: "security.users.add" },
          { permission: "security.users.find" },
          { permission: "security.users.update" },
          { permission: "security.users.remove" }
        ],
      }
    ];

    const repository = this.getRepository(context);

    for (let i = 0; i < roles.length; i++) {
      const { name } = roles[i];

      const role = await repository.findOne({
        where: {
          name
        }
      })

      if(role) throw new BadRequestException(`The role with the name: ${name} already exists in the database`);
    }

    const newRoles = repository.create(roles);

    await repository.save(newRoles)

    return newRoles;
  }

  @OnEvent(validateRoleEvent)
  async onValidateRole({
    context,
    roleId,
    orFail
  }: {
    context: IContext;
    roleId: string;
    orFail: boolean;
  }): Promise<Role> {

    const role = await this.findOneById(context, roleId, orFail);

    return role;
  }
}
