// email value object
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Email value object
 * @description This value object is used to validate and store the email
 */
export class EmailValueObject {
  private readonly email: string;

  /**
   * Create a new email value object
   * @param email - The email to create the value object for
   * @throws {Error} - If the email is invalid
   */
  constructor(email: string) {
    const trimmedEmail = email.trim();

    if (trimmedEmail === "") {
      throw new ValidationException("Email is required");
    }

    if (!trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new ValidationException("Invalid email");
    }

    this.email = trimmedEmail;
  }

  /**
   * Get the value of the email
   * @returns The email
   */
  public getValue(): string {
    return this.email;
  }

  /**
   * Get the string representation of the email
   * @returns The email
   */
  public toString(): string {
    return this.email;
  }
}
