import { Inject, Injectable } from "@nestjs/common";
import {
  type ITokenService,
  TOKEN_SERVICE_TOKEN,
} from "@/modules/auth/domain/services/token.service";
import { ConfigService } from "@nestjs/config";
import { JwtVerifyOptions } from "@nestjs/jwt";
/**
 * Verify code use case
 * @description Verify code use case which is used to verify a code.
 */
@Injectable()
export class VerifyCodeUseCase {
  /**
   * Constructor for VerifyCodeUseCase
   * @param tokenService - The token service
   */
  constructor(
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Execute the verify code use case
   * @param code - The code to be verified
   * @param resetToken - The reset token
   * @returns The verified code
   */
  public async execute(
    code: string,
    resetToken: string,
  ): Promise<{
    isValid: boolean;
    payload: { email: string; code: string } | null;
  }> {
    const secret: string = this.configService.get<string>(
      "jwtToken.JWT_ACCESS_TOKEN_SECRET",
    )!;
    const options: JwtVerifyOptions = {
      secret: secret,
    };
    // extract the payload from the code
    let payload: { email: string; code: string } | null = null;
    try {
      payload = await this.tokenService.verify(resetToken, options);
    } catch {
      return { isValid: false, payload: null };
    }

    // check whether the payload is valid
    if (!payload || !payload.email || !payload.code || payload.code !== code) {
      return { isValid: false, payload: null };
    }

    // return true
    return { isValid: true, payload: payload };
  }
}
