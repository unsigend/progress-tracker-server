// import dependencies
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";

/**
 * Password hasher token
 * @description Password hasher token
 */
export const PASSWORD_HASHER_TOKEN = Symbol("PASSWORD_HASHER_TOKEN");

/**
 * Password hasher interface
 * @description Password hasher interface
 */
export interface IPasswordHasher {
  /**
   * Hash a password and return a new password value object
   * @description Hash a password
   * @param password - The password to be hashed
   * @returns The hashed password value object
   */
  hash(password: PasswordValueObject): Promise<PasswordValueObject>;

  /**
   * Verify a password and return true if the password is verified, false otherwise
   * @description Verify a password
   * @param password - The password to be verified
   * @param hashedPassword - The hashed password to be verified
   * @returns True if the password is verified, false otherwise
   */
  verify(
    password: PasswordValueObject,
    hashedPassword: PasswordValueObject,
  ): Promise<boolean>;
}
