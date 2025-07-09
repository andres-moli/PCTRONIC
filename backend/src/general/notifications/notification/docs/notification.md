
# Notification

Notifications module allows you to centralize all types of Certimails notifications sent to customers (email, sms, whatsapp and push notifications). What must be done to implement in a new module the notification service is to create a new type of service with the extension ```.notification.service.ts``` in our services folder. 

Example: ```dummy.notification.service.ts```

Each of the notification services created must end up calling the notification service through the EventEmitter2, so when calling the constructor of the service we must have at least:

```typescript
@Injectable()
export class DummyNotificationService {
    constructor(
        private readonly eventEmitter: EventEmitter2
    ) { }
}
```

Each creation of a notification type has a different structure handling, so at least these definitions should be followed:  

### Email

```typescript
async emailDummy(context:IContext, createInput: CreateDummyInput): Promise<void> {

    //Depending on the case, the email sending may or may not be stopped in the process, so if the process you are performing requires it to be sent, the empty email field should return an error.
    if (!createInput.email) return;

    //Depending on the case, the user field is optional, so if there are processes that do not have a specific user associated with them, you should not put
    const user = await this.usersService.findOne(context,context.user.id,true);

    //Metadata is filled by whatever the notification requires, being fields from strings to call urls
    const dictionary: ICertimailsDictionary = {};
    dictionary['NAME'] = createInput.firstField;

    const notificationInput: CreateNotificationInput = new CreateNotificationInput();

    //Type will determine which certimails service call the process
    notificationInput.type = TypeNotification.Email;

    //Type and subtype must be defined in the created notification configuration, since the direct reference between the notification and the process that executes it are the type and subtype.
    notificationInput.typeConfig = NotificationTypes.Token;
    notificationInput.subtypeConfig = "signUp";

    notificationInput.metadata = JSON.stringify(dictionary);

    //Recipients can be an array of recipients, where the first one can be of type recipient and the rest CC or BCC
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
```

### Sms

```typescript
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
        notificationInput.dictionary = dictionary;

        //unlike email, sms can only contain one recipient to send to
        notificationInput.smsRecipient = {
            phone: createInput.phone,
            email: createInput.email,
            name: createInput.firstField
        };

        await this.eventEmitter.emitAsync(createNotificationEvent, { context, input: notificationInput });
    }
```