import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  /**
   * Send a verification email to a newly registered user.
   * @param to recipient email address
   * @param name user's name
   * @param verificationLink full URL for email verification
   * @param expiresIn duration text (e.g. '48 hours')
   */
  async sendVerificationEmail(
    to: string,
    name: string,
    verificationLink: string,
    expiresIn = '48 hours',
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Verify your email address',
        template: './email-verification',
        context: {
          name,
          verificationLink,
          expiresIn,
          year: 2025
        },
      });

      this.logger.log(`Verification email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${to}`, error.stack);
      throw error;
    }
  }

  /**
   * Generic function to send any email if needed
   */
  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({ to, subject, template, context });
      this.logger.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error.stack);
      throw error;
    }
  }
}
