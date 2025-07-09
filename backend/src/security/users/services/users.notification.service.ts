import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { User } from '../entities/user.entity';
import { ICertimailsDictionary } from '../../../external-api/certimails/email/interface/email.interface';
import { CreateNotificationInput } from '../../../general/notifications/notification/dto/inputs/create-notification.input';
import { NotificationTypes } from '../../../general/notifications/notification-config/enums/notification-type.enum';
import { TypeNotification } from '../../../general/notifications/notification/enums/type-notificartion.enum';
import { EmailRecipient } from '../../../external-api/certimails/email/dto/args/email.args';
import { RecipientType } from '../../../external-api/certimails/email/interface/email.enum';
import { createNotificationEvent } from '../../../general/notifications/notification/constants/events.constants';
import { recoverPasswordEmailEvent } from '../../auth/constants/events.constants';

@Injectable()
export class UsersNotificationService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async recoverPasswordEmail(context:IContext, user: User, code: string): Promise<Notification> {
        if (!user.email) return;

        const dictionary: ICertimailsDictionary = {};
        dictionary['CODE'] = code;

        const notificationInput: CreateNotificationInput = new CreateNotificationInput();
        notificationInput.typeConfig = NotificationTypes.Token;
        notificationInput.subtypeConfig = "recoverPassword";
        notificationInput.userId = user.id;
        notificationInput.metadata = JSON.stringify(dictionary);
        notificationInput.type = TypeNotification.Email;

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

        const [result] = await this.eventEmitter.emitAsync(createNotificationEvent, { context, input: notificationInput });
        if (!(result instanceof Notification)) {
            throw new BadRequestException('An error occurred while creating the notification: ' + result);
        }
        
        return result;
    }

    @OnEvent(recoverPasswordEmailEvent)
    async onRecoverPasswordEmail({
        context,
        user,
        code,
    }: {
        context: IContext;
        user: User;
        code: string;
    }): Promise<Notification> {
        return this.recoverPasswordEmail(context, user, code);
    }
}