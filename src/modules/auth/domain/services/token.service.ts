// import entities
import { UserRole } from "@/modules/user/domain/entities/user.entity";
import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

/**
 * Token service token
 * @description Token service token
 */
export const TOKEN_SERVICE_TOKEN = Symbol("TOKEN_SERVICE_TOKEN");

/**
 * Token payload interface
 * @description Token payload interface
 */
export interface ITokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * Token service interface
 * @description Token service interface
 */
export interface ITokenService {
  /**
   * Generate an access token
   * @description Generate an access token
   * @param payload - The payload to be used to generate the access token
   * @returns The access token
   */
  generateAccessToken(payload: ITokenPayload): Promise<string>;

  /**
   * Generate a refresh token
   * @description Generate a refresh token
   * @param payload - The payload to be used to generate the refresh token
   * @returns The refresh token
   */
  generateRefreshToken(payload: ITokenPayload): Promise<string>;

  /**
   * Verify an access token
   * @description Verify an access token
   * @param token - The token to be verified
   * @returns The payload if the token is valid, undefined otherwise
   */
  verifyAccessToken(token: string): Promise<ITokenPayload>;

  /**
   * Verify a refresh token
   * @description Verify a refresh token
   * @param token - The token to be verified
   * @returns The payload if the token is valid, null otherwise
   */
  verifyRefreshToken(token: string): Promise<ITokenPayload>;

  /**
   * Sign a payload
   * @description Sign a payload
   * @param payload - The payload to be signed
   * @param options - The options to be used to sign the payload (supports secret property)
   * @returns The signed payload
   */
  sign<T>(payload: T, options: JwtSignOptions): Promise<string>;

  /**
   * Verify a signed payload
   * @description Verify a signed payload
   * @param token - The token to be verified
   * @param options - The options to be used to verify the token
   * @returns The verified payload of type T
   */
  verify<T>(token: string, options: JwtVerifyOptions): Promise<T>;
}
