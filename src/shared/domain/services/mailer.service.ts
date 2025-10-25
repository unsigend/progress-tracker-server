// import dependencies
import type { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";

/**
 * Mailer token
 * @description Mailer token
 */
export const MAILER_TOKEN = Symbol("MAILER_TOKEN");

/**
 * Mailer interface
 * @description Mailer interface
 */
export interface IMailer {
  /**
   * Send an email
   * @description Send an email
   * @param email - The email to send the email to
   * @param subject - The subject of the email
   * @param content - The content of the email
   * @returns void
   */
  sendEmail(
    email: EmailValueObject,
    subject: string,
    content: string,
  ): Promise<void>;
}
