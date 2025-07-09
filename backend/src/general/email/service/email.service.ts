// mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailContext } from '../interface/email.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(to: string, subject: string, template: string, context: ISendMailContext) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: `./${template}`,
      context:context
    }).catch(e => {
      console.log(e)
    });
  }
}
