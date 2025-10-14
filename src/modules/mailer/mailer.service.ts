// import dependencies
import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";

// import services
import { ConfigService } from "@nestjs/config";

// import types
import { CONFIG_MAILER } from "@modules/mailer/config/mailer.config.type";

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  /**
   * Constructor for initializing the mailer service
   */
  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<CONFIG_MAILER>("mailer")!;

    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });
  }

  /**
   * Generate a 6-digit verification code
   * @returns A 6-digit verification code
   */
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Send verification code to email address
   * @param email - The email address to send the verification code to
   * @returns The verification code that was sent
   */
  async sendVerificationCode(email: string): Promise<string> {
    const config = this.configService.get<CONFIG_MAILER>("mailer")!;
    const verificationCode = this.generateVerificationCode();

    const mailOptions = {
      from: `"${config.FROM_NAME}" <${config.FROM_EMAIL}>`,
      to: email,
      subject: "Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verification Code</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 4px;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 5 minutes. Please do not share this code with anyone.</p>
          <p>If you did not request this verification code, please ignore this email.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return verificationCode;
    } catch (error) {
      throw new Error(
        `Failed to send verification email: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
