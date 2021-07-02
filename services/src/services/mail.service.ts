import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendServerDownEmail(toEmail: string, data: any = {}) {
    //const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: toEmail,
      subject: `The Server ${data.address} was unreachable`,
      template: './server-down',
      context: data,
    });
  }
}