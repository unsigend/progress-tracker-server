// email value object

import { ValidationException } from "@domain/exceptions/validation.exception";

export class EmailValueObject {
  private readonly email: string;

  constructor(email: string) {
    // normalize the email
    const normalizedEmail = email?.toLowerCase().trim() ?? "";

    // the email is required
    if (!normalizedEmail) {
      throw new ValidationException("Email is required");
    }

    // the email must be in a valid format
    if (!normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new ValidationException("Invalid email format");
    }

    this.email = normalizedEmail;
  }

  /**
   * Get the email value
   * @returns The email value
   */
  getValue(): string {
    return this.email;
  }

  /**
   * Get the email value as a string
   * @returns The email value as a string
   */
  toString(): string {
    return this.email;
  }

  /**
   * Check if the email is equal to another email
   * @param email - The email to check
   * @returns True if the email is equal to the other email, false otherwise
   */
  equals(email: EmailValueObject): boolean {
    return this.email === email.getValue();
  }
}
