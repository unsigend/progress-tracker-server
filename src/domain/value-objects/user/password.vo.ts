// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Password value object
 * @description Password value object
 */
export class PasswordValueObject {
  private readonly MIN_LENGTH = 8 as const;
  private readonly MAX_LENGTH = 128 as const;
  private readonly password: string;

  /**
   * Constructor
   * @param password - The password to be validated
   */
  constructor(password: string) {
    if (!password) {
      throw new ValidationException("Password is required");
    }
    const trimmedPassword = password.trim();
    if (trimmedPassword === "") {
      throw new ValidationException("Password is required");
    }
    if (password.length < this.MIN_LENGTH) {
      throw new ValidationException(
        `Password must be at least ${this.MIN_LENGTH} characters long`,
      );
    }
    if (password.length > this.MAX_LENGTH) {
      throw new ValidationException(
        `Password must be less than ${this.MAX_LENGTH} characters long`,
      );
    }
    this.password = trimmedPassword;
  }

  /**
   * Get the value of the password
   * @returns The value of the password
   */
  public getValue(): string {
    return this.password;
  }

  /**
   * Check if the password is equal to another password
   * @param other - The other password to compare
   * @returns True if the password is equal to another password, false otherwise
   */
  public equals(other: PasswordValueObject): boolean {
    return this.password === other.getValue();
  }
}
