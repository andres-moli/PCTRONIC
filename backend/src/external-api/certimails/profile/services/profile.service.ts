import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProfileInput } from '../dto/inputs/create-profile.input';
import { UpdateProfileInput } from '../dto/inputs/update-profile.input';
import { Profile } from '../entities/profile.entity';
import { ProfileManagerService } from './profile.manager.service';
import { CrudServiceStructure } from '../../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from '../../../../patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from '../../../../patterns/crud-pattern/interfaces/context.interface';

export const serviceStructure = CrudServiceStructure({
  entityType: Profile,
  createInputType: CreateProfileInput,
  updateInputType: UpdateProfileInput,
});

@Injectable()
export class ProfileService extends CrudServiceFrom(serviceStructure) {
  constructor(
    @Inject(ProfileManagerService)
    private readonly profileManagerService:ProfileManagerService
  ){
    super();
  }

  async beforeCreate(context:IContext,repository: Repository<Profile>, entity: Profile, createInput: CreateProfileInput): Promise<void> {
    entity.externalId = await this.profileManagerService.createProfile(createInput)
  }

}