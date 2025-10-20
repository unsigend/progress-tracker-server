// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Username value object
 * @description Username value object
 */
export class UsernameValueObject {
  private readonly username: string;

  /**
   * Constructor
   * @param username - The username to be validated
   */
  constructor(username?: string) {
    if (!username) {
      throw new ValidationException("Username is required");
    }
    const trimmedUsername = username.trim();
    if (trimmedUsername === "") {
      throw new ValidationException("Username is required");
    }
    this.username = trimmedUsername;
  }

  /**
   * Get the value of the username
   * @returns The value of the username
   */
  public getValue(): string {
    return this.username;
  }

  /**
   * Check if the username is equal to another username
   * @param other - The other username to compare
   * @returns True if the username is equal to another username, false otherwise
   */
  public equals(other: UsernameValueObject): boolean {
    return this.username === other.getValue();
  }
}
