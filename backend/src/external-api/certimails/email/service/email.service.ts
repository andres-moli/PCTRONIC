import { Injectable, BadRequestException } from '@nestjs/common';
import { EmailManagerService } from './email.manager.service';
import { ProfileService } from '../../profile/services/profile.service';
import { EmailArgs, EmailRecipient } from '../dto/args/email.args';
import { IEmailRequest, IEmailResponse } from '../interface/email.interface';
import { BodyType, RecipientType } from '../interface/email.enum';
import { User } from '../../../../security/users/entities/user.entity';

@Injectable()
export class EmailService {
    constructor(
        private readonly emailManagerService: EmailManagerService,
        private readonly profileService: ProfileService,
    ) {}

    async createEmail(emailArgs: EmailArgs): Promise<IEmailResponse> {

        const profile = await this.profileService.findOne({user: undefined}, emailArgs.profileId, true);

        await this.__hasValidRecipient(emailArgs.recipients);

        const emailStructure: IEmailRequest = {
            ApiKey: profile.externalId,
            FromEmail: profile.email,
            FromEmailName: profile.firstName + ' ' + profile.lastName,
            BodyType: BodyType.Code,
            Subject: emailArgs.subject,
            CorDosPasos: emailArgs.twoSteps,
            LotGUID: emailArgs.notificationGroupId,
            LotName: emailArgs.notificationGroupName,
            Plantilla: {
                CorTplCod: emailArgs.template.principal,
                CorTplCod02: emailArgs.template.secondary,
                CorTplMdata: emailArgs.template.metadata
            },
            Recipients: emailArgs.recipients.map(recipient => {
                return {
                    Email: recipient.email,
                    Type: recipient.type,
                    AditionalInfo: {
                        Name: recipient.aditionalInfo?.name,
                        LastName: recipient.aditionalInfo?.lastName,
                        Id: recipient.aditionalInfo?.id,
                        Phone: recipient.aditionalInfo?.phone
                    }
                };
            })
        }
        return await this.emailManagerService.sendEmail(emailStructure);
    }

    getRecipientByUser(user: User): EmailRecipient[] {
        return [{
            email: user.email,
            type: RecipientType.Destinatary,
            aditionalInfo: {
                name: user.name,
                lastName: user.lastName,
                phone: user.phoneNumber,
                id: user.identificationNumber,
            }
        }];
    }

    private async __hasValidRecipient(recipients: EmailRecipient[]) {
        const to_s = await recipients.filter((item) => item.type === RecipientType.Destinatary && item.email);
        if (to_s.length === 0) throw new BadRequestException('Has no available recipients');
    }

}