// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Email value object
 * @description Email value object
 */
export class EmailValueObject {
  private readonly email: string;

  /**
   * Constructor
   * @param email - The email to be validated
   */
  constructor(email: string) {
    if (!email) {
      throw new ValidationException("Email is required");
    }
    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      throw new ValidationException("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      throw new ValidationException("Invalid email format");
    }
    this.email = trimmedEmail;
  }
  /**
   * Get the value of the email
   * @returns The value of the email
   */
  public getValue(): string {
    return this.email;
  }

  /**
   * Check if the email is equal to another email
   * @param other - The other email to compare
   * @returns True if the email is equal to another email, false otherwise
   */
  public equals(other: EmailValueObject): boolean {
    return this.email === other.getValue();
  }
}
