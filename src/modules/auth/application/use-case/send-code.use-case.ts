import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "@/modules/user/domain/repositories/user.repository";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import {
  type IMailer,
  MAILER_TOKEN,
} from "@/shared/domain/services/mailer.service";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  type ITokenService,
  TOKEN_SERVICE_TOKEN,
} from "@/modules/auth/domain/services/token.service";
import { ConfigService } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";

/**
 * Send code use case
 * @description Send code use case which is used to send a code to a user's email
 */
@Injectable()
export class SendCodeUseCase {
  /**
   * Constructor for SendCodeUseCase
   * @param mailer - The mailer service
   */
  constructor(
    @Inject(MAILER_TOKEN)
    private readonly mailer: IMailer,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate an HTML template for the verify code email
   * @param verificationCode - The verification code
   * @returns The HTML template
   */
  private generateHtmlTemplate(verificationCode: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff;">
                <tr>
                  <td style="padding: 0 0 40px 0; border-bottom: 1px solid #000000;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #000000; letter-spacing: -0.5px;">
                      Progress<span style="color: #4a4a4a;">Tracker</span>
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 0 0 0;">
                    <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #000000;">
                      Verification Code
                    </h2>
                    <p style="margin: 0 0 32px 0; font-size: 14px; line-height: 1.5; color: #4a4a4a;">
                      Your verification code is:
                    </p>
                    <!-- Code Display -->
                    <div style="background-color: #000000; padding: 24px; text-align: center; margin: 0 0 32px 0;">
                      <h1 style="margin: 0; font-size: 36px; font-weight: 600; color: #ffffff; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                        ${verificationCode}
                      </h1>
                    </div>
                    <!-- Footer Text -->
                    <p style="margin: 0 0 16px 0; font-size: 12px; line-height: 1.5; color: #4a4a4a;">
                      This code will expire in 5 minutes. Please do not share this code with anyone.
                    </p>
                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #4a4a4a;">
                      If you did not request this verification code, please ignore this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 0 0 0; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0; font-size: 11px; color: #9a9a9a; text-align: center;">
                      © ${new Date().getFullYear()} Progress Tracker. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  /**
   * Generate a verification code
   * @returns The verification code
   */
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Execute the send verify code use case
   * @param email - The email to send the verify code to
   * @returns void
   */
  public async execute(email: EmailValueObject): Promise<string> {
    // check whether the email exist
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // generate the verification code and the HTML template
    const verificationCode: string = this.generateVerificationCode();
    const htmlTemplate: string = this.generateHtmlTemplate(verificationCode);

    // send the email
    await this.mailer.sendEmail(email, "Verification Code", htmlTemplate);

    // generate the reset token
    const payload: { email: string; code: string } = {
      email: email.getEmail(),
      code: verificationCode,
    };
    const secret: string = this.configService.get<string>(
      "jwtToken.JWT_ACCESS_TOKEN_SECRET",
    )!;
    const options: JwtSignOptions = {
      expiresIn: "5m",
      secret: secret,
    };

    const resetToken: string = await this.tokenService.sign<{
      email: string;
      code: string;
    }>(payload, options);
    return resetToken;
  }
}
