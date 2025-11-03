// import dependencies
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { ITokenService } from "@/modules/auth/domain/services/token.service";
import { ITokenPayload } from "@/modules/auth/domain/services/token.service";

/**
 * JWT token service
 * @description JWT token service
 */
@Injectable()
export class JwtTokenService implements ITokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpirationTime: string;
  private readonly refreshTokenExpirationTime: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      "jwtToken.JWT_ACCESS_TOKEN_SECRET",
    )!;
    this.refreshTokenSecret = this.configService.get<string>(
      "jwtToken.JWT_REFRESH_TOKEN_SECRET",
    )!;
    this.accessTokenExpirationTime = this.configService.get<string>(
      "jwtToken.JWT_ACCESS_TOKEN_EXPIRATION_TIME",
    )!;
    this.refreshTokenExpirationTime = this.configService.get<string>(
      "jwtToken.JWT_REFRESH_TOKEN_EXPIRATION_TIME",
    )!;
  }

  /**
   * Generate an access token
   * @description Generate an access token
   * @param payload - The payload to be used to generate the access token
   * @returns The access token
   */
  async generateAccessToken(payload: ITokenPayload): Promise<string> {
    return this.jwtService.signAsync(
      payload as object,
      {
        secret: this.accessTokenSecret,
        expiresIn: this.accessTokenExpirationTime,
      } as JwtSignOptions,
    );
  }

  /**
   * Generate a refresh token
   * @description Generate a refresh token
   * @param payload - The payload to be used to generate the refresh token
   * @returns The refresh token
   */
  async generateRefreshToken(payload: ITokenPayload): Promise<string> {
    return this.jwtService.signAsync(
      payload as object,
      {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpirationTime,
      } as JwtSignOptions,
    );
  }

  /**
   * Verify an access token
   * @description Verify an access token
   * @param token - The token to be verified
   * @returns The payload if the token is valid, undefined otherwise
   */
  async verifyAccessToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.accessTokenSecret,
    });
  }

  /**
   * Verify a refresh token
   * @description Verify a refresh token
   * @param token - The token to be verified
   * @returns The payload if the token is valid, null otherwise
   */
  async verifyRefreshToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.refreshTokenSecret,
    });
  }

  /**
   * Sign a payload
   * @description Sign a payload
   * @param payload - The payload to be signed
   * @param options - The options to be used to sign the payload
   * @returns The signed payload
   */
  async sign<T>(payload: T, options: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync(payload as object, options);
  }

  /**
   * Verify a signed payload
   * @description Verify a signed payload
   * @param token - The token to be verified
   * @param options - The options to be used to verify the token
   * @returns The verified payload
   */
  async verify<T>(token: string, options: JwtVerifyOptions): Promise<T> {
    return this.jwtService.verifyAsync(token, options) as Promise<T>;
  }
}
