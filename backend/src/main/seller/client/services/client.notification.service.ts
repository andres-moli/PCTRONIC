import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from 'src/security/users/services/users.service';

@Injectable()
export class ClientNotificationService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly usersService: UsersService
    ) { }
}