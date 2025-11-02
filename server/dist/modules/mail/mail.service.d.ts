import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendVerificationEmail(to: string, name: string, verificationLink: string, expiresIn?: string): Promise<void>;
    sendMail(to: string, subject: string, template: string, context: Record<string, any>): Promise<void>;
}
