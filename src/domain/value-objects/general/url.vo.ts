// url value object

// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Url value object
 * @description This value object is used to validate and store the url
 */
export class UrlValueObject {
  private readonly url: string;

  /**
   * Create a new url value object
   * @param url - The url to create the value object for
   * @throws {ValidationException} - If the url is invalid
   */
  constructor(url: string) {
    // check the url is provided
    if (!url || url.trim() === "") {
      throw new ValidationException("Url is required");
    }

    if (
      !url.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
    ) {
      throw new ValidationException("Invalid url format");
    }

    this.url = url.trim();
  }

  /**
   * Get the value of the url
   * @returns The url
   */
  getValue(): string {
    return this.url;
  }

  /**
   * Get the string representation of the url
   * @returns The url
   */
  toString(): string {
    return this.url;
  }

  /**
   * Check if the url is equal to another url
   * @param other - The other url
   * @returns True if the url is equal to the other url, false otherwise
   */
  equals(other: UrlValueObject): boolean {
    if (!other) {
      return false;
    }
    return this.url === other.url;
  }
}
