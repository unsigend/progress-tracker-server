// import dependencies
import { Injectable } from "@nestjs/common";
import { IMailer } from "@shared/domain/services/mailer.service";
import { ConfigService } from "@nestjs/config";
import { EmailValueObject } from "@modules/user/domain/value-object/email.vo";
import { Resend } from "resend";

/**
 * Resend Mailer Service
 * @description Resend Mailer Service
 */
@Injectable()
export class ResendMailerService implements IMailer {
  private readonly resendApiKey: string;
  private readonly resendFromEmail: string;
  private readonly resendDomainName: string;
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resendApiKey = this.configService.get<string>(
      "resendMailer.RESEND_API_KEY",
    )!;
    this.resendFromEmail = this.configService.get<string>(
      "resendMailer.RESEND_FROM_EMAIL",
    )!;
    this.resendDomainName = this.configService.get<string>(
      "resendMailer.RESEND_DOMAIN_NAME",
    )!;
    this.resend = new Resend(this.resendApiKey);
  }

  /**
   * Send an email
   * @description Send an email
   * @param email - The email to send the email to
   * @param subject - The subject of the email
   * @param content - The content of the email
   * @returns void
   */
  async sendEmail(
    email: EmailValueObject,
    subject: string,
    content: string,
  ): Promise<void> {
    await this.resend.emails.send({
      from: `${this.resendDomainName} <${this.resendFromEmail}>`,
      to: email.getEmail(),
      subject: subject,
      html: content,
    });
  }
}
