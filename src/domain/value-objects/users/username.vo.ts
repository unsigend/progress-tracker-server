// username value object

// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Username value object
 * @description This value object is used to validate and store the username
 */
export class UsernameValueObject {
  private readonly username: string;

  /**
   * Create a new username value object
   * @param username - The username to create the value object for
   * @throws {ValidationException} - If the username is invalid
   */
  constructor(username: string) {
    // check if the username is required
    if (!username || username.trim() === "") {
      throw new ValidationException("Username is required");
    }

    const trimmedUsername = username.trim();

    // check if the username is between 3 and 20 characters
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      throw new ValidationException(
        "Username must be between 3 and 20 characters",
      );
    }
    this.username = trimmedUsername;
  }

  /**
   * Get the value of the username
   * @returns The username
   */
  getValue(): string {
    return this.username;
  }

  /**
   * Get the string representation of the username
   * @returns The username
   */
  toString(): string {
    return this.username;
  }

  /**
   * Check if the username is equal to another username
   * @param other - The other username
   * @returns True if the username is equal to the other username, false otherwise
   */
  equals(other: UsernameValueObject): boolean {
    if (!other) {
      return false;
    }
    return this.username === other.username;
  }
}
