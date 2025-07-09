import { CanActivate, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { FUNCTIONALITY_KEY } from '../decorators/functionality.decorator';
import { ExtendedExecutionContext } from '../interfaces/functionality.interface';
import { FunctionalityModel } from '../../models/functionality.model';
import { UserTypes } from '../../users/enums/user-type.enum';

@Injectable()
export class FunctionalityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  async canActivate( context: ExtendedExecutionContext ): Promise<boolean> {
    const functionalities = this.reflector.get<FunctionalityModel>(
      FUNCTIONALITY_KEY,
      context.getHandler(),
    );
    
    const user = context.user;

    if(!user) throw new ForbiddenException('You are not allowed to perform this action');

    if (functionalities && user.type !== UserTypes.SuperAdmin) {
      const { id } = user;

      const result = await this.authService.validateFunctionality(
        context,
        functionalities.key,
        id,
      );

      if(!result) throw new ForbiddenException('You are not allowed to perform this action');
    }
    return true;
  }
}
