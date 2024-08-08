import { Module } from '@nestjs/common';
import { MailerModule as MailerModuleNest } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModuleNest.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: `"Cacart <Noreply@caCart.com>" <${process.env.EMAIL_USER}>`,
      },
      template: {
        dir: join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'src',
          'modules',
          'mailer',
          'templates',
        ),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailerModuleNest],
})
export class MailerModule {}
