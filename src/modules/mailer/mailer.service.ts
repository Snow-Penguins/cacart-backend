import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMail(to: string, subject: string, template: string, context: any) {
    try {
      console.log('Sending email to:', to);
      console.log('Email subject:', subject);
      console.log('Using template:', template);
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
