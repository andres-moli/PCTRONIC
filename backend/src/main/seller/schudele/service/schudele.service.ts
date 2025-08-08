import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { Schedule } from '../entities/schudele.entity';
import { CreateScheduleDto } from '../dto/inputs/create-schudele.input';
import { UpdateScheduleDto } from '../dto/inputs/update-schudele.input';
import { FindScheduleArgs } from '../dto/args/find-schudele.args';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';
export const serviceStructure = CrudServiceStructure({
  entityType: Schedule,
  createInputType: CreateScheduleDto,
  updateInputType: UpdateScheduleDto,
  findArgsType: FindScheduleArgs,
});

@Injectable()
export class SchudeleService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly userService: UsersService, // Assuming this is a service that provides user-related functionality
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<Schedule>, entity: Schedule, createInput: CreateScheduleDto): Promise<void> {
    // Example: Set the creator of the schedule to the current user
    const currentUser = await this.userService.findOne(context, createInput.userId, true);
    entity.user = currentUser;
  }
}
