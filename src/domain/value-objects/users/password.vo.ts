// password value object

// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Password value object
 * @description This value object is used to validate and store the password
 */
export class PasswordValueObject {
  private readonly password: string;

  /**
   * Create a new password value object
   * @param password - The password to create the value object for
   * @throws {ValidationException} - If the password is invalid
   */
  constructor(password: string) {
    // check if the password is at least 8 characters long
    if (password.length < 8) {
      throw new ValidationException(
        "Password must be at least 8 characters long",
      );
    }

    // check if the password is less than 128 characters long
    if (password.length > 128) {
      throw new ValidationException(
        "Password must be less than 128 characters long",
      );
    }

    this.password = password;
  }

  /**
   * Get the value of the password
   * @returns The password
   */
  getValue(): string {
    return this.password;
  }

  /**
   * Get the string representation of the password
   * @returns "[PROTECTED]"
   */
  toString(): string {
    return "[PROTECTED]";
  }
}
