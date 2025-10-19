// password value object

import { ValidationException } from "@domain/exceptions/validation.exception";

export class PasswordValueObject {
  private readonly password: string;

  constructor(password: string) {
    // validate the password
    if (!password) {
      throw new ValidationException("Password is required");
    }

    // the password must be at least 8 characters long
    if (password.length < 8) {
      throw new ValidationException(
        "Password must be at least 8 characters long",
      );
    }

    // the password must be at most 128 characters long
    if (password.length > 128) {
      throw new ValidationException(
        "Password must be at most 128 characters long",
      );
    }

    this.password = password;
  }

  /**
   * Get the password value
   * @returns The password value
   */
  getValue(): string {
    return this.password;
  }

  /**
   * Get the password value as a string
   * @returns The password value as a string
   */
  toString(): string {
    return "[PROTECTED]";
  }

  /**
   * Check if the password is equal to another password
   * @param password - The password to check
   * @returns True if the password is equal to the other password, false otherwise
   */
  equals(password: PasswordValueObject): boolean {
    return this.password === password.getValue();
  }
}
