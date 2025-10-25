// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";
import { isEmail } from "class-validator";

/**
 * Email value object
 * @description Email value object which is used to store the email.
 */
export class EmailValueObject {
  // private properties
  private readonly email: string;

  /**
   * Constructor for EmailValueObject
   * @param email - The email of the object
   * @throws ValidationException if the email is not a valid email
   */
  constructor(email: string) {
    if (!email?.trim() || !isEmail(email)) {
      throw new ValidationException("Invalid email");
    }
    this.email = email.trim();
  }

  /**
   * Get the email
   * @returns The email
   */
  public getEmail(): string {
    return this.email;
  }
}
