// import dependencies
import { registerAs } from "@nestjs/config";
import { ResendMailerConfigType } from "@/infrastructure/services/resend-mailer/config/resend-mailer-type.config";
import { validateConfig } from "@/platforms/utils/validate-config";

/**
 * Resend Mailer Configuration
 * @description Resend Mailer Configuration
 */
export default registerAs<ResendMailerConfigType>("resendMailer", () => {
  validateConfig(ResendMailerConfigType, process.env);

  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL!,
    RESEND_DOMAIN_NAME: process.env.RESEND_DOMAIN_NAME!,
  };
});
