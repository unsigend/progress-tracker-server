/**
 * Mailer configuration interface
 */
export interface CONFIG_MAILER {
  // SMTP host
  SMTP_HOST: string;

  // SMTP port
  SMTP_PORT: number;

  // SMTP username
  SMTP_USER: string;

  // SMTP password
  SMTP_PASS: string;

  // From email address
  FROM_EMAIL: string;

  // From name
  FROM_NAME: string;
}
