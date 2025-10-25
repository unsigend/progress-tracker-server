// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";
/**
 * Password value object
 * @description Password value object which is used to store the password.
 */
export class PasswordValueObject {
  // private properties
  private readonly password: string;

  /**
   * Constructor for PasswordValueObject
   * @param password - The password of the object
   * @throws ValidationException if the password is not a valid password
   */
  constructor(password: string) {
    if (!password?.trim()) {
      throw new ValidationException("Password is required");
    }
    if (password.length < 8) {
      throw new ValidationException(
        "Password must be at least 8 characters long",
      );
    }
    if (password.length > 128) {
      throw new ValidationException(
        "Password must be less than 128 characters long",
      );
    }
    this.password = password.trim();
  }

  /**
   * Get the password
   * @returns The password
   */
  public getPassword(): string {
    return this.password;
  }
}
