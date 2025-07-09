import { Injectable } from '@nestjs/common';
import { CreateDummyInput } from '../dto/inputs/create-dummy.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from '../../../security/users/services/users.service';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { ICertimailsDictionary } from '../../../external-api/certimails/email/interface/email.interface';
import { CreateNotificationInput } from '../../notifications/notification/dto/inputs/create-notification.input';
import { TypeNotification } from '../../notifications/notification/enums/type-notificartion.enum';
import { NotificationTypes } from '../../notifications/notification-config/enums/notification-type.enum';
import { EmailRecipient } from '../../../external-api/certimails/email/dto/args/email.args';
import { RecipientType } from '../../../external-api/certimails/email/interface/email.enum';
import { createNotificationEvent } from '../../notifications/notification/constants/events.constants';

@Injectable()
export class DummyNotificationService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly usersService: UsersService
    ) { }

    async emailDummy(context:IContext, createInput: CreateDummyInput): Promise<void> {

        if (!createInput.email) return;

        const user = await this.usersService.findOne(context,context.user.id,true);

        const dictionary: ICertimailsDictionary = {};
        dictionary['NAME'] = createInput.firstField;

        const notificationInput: CreateNotificationInput = new CreateNotificationInput();
        notificationInput.type = TypeNotification.Email;
        notificationInput.typeConfig = NotificationTypes.Token;
        notificationInput.subtypeConfig = "signUp";
        notificationInput.metadata = JSON.stringify(dictionary);

        const recipients: EmailRecipient[] = [{
            email: user.email,
            type: RecipientType.Destinatary,
            aditionalInfo: {
                name: user.name,
                lastName: user.lastName,
                phone: user.phoneNumber,
                id: user.identificationNumber,
            }
        }];
        notificationInput.emailRecipients = recipients;

        await this.eventEmitter.emitAsync(createNotificationEvent, { context, input: notificationInput });
    }

    async smsDummy(context:IContext, createInput: CreateDummyInput): Promise<void> {

        if (!createInput.phone) return;

        const user = await this.usersService.findOne(context,context.user.id,true);

        const dictionary: ICertimailsDictionary = {};
        dictionary['NAME'] = createInput.firstField;

        const notificationInput: CreateNotificationInput = new CreateNotificationInput();
        notificationInput.type = TypeNotification.Sms;
        notificationInput.typeConfig = NotificationTypes.Token;
        notificationInput.subtypeConfig = "signUp";
        notificationInput.metadata = JSON.stringify(dictionary);
        notificationInput.smsRecipient = {
            phone: createInput.phone,
            email: createInput.email,
            name: createInput.firstField
        };

        const [result] = await this.eventEmitter.emitAsync(createNotificationEvent, { context, input: notificationInput });
        /*
        if (!(result instanceof Notification)) {
            throw new BadRequestException('An error occurred creating notification: ' + result);
        }
        return result;
        */
    }
}