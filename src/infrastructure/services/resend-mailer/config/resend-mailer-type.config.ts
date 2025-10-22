// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Resend Mailer Configuration Type
 * @description Resend Mailer Configuration Type
 */
export class ResendMailerConfigType {
  @IsString()
  @IsNotEmpty()
  RESEND_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  RESEND_FROM_EMAIL: string;

  @IsString()
  @IsNotEmpty()
  RESEND_DOMAIN_NAME: string;
}
