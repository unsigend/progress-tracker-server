// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * URL value object
 * @description URL value object
 */
export class UrlValueObject {
  private readonly url: string;

  /**
   * Constructor
   * @param url - The URL to be validated
   */
  constructor(url: string) {
    if (!url) {
      throw new ValidationException("URL is required");
    }
    const trimmedUrl = url.trim();
    if (trimmedUrl === "") {
      throw new ValidationException("URL is required");
    }
    if (!/^https?:\/\/.+$/.test(trimmedUrl)) {
      throw new ValidationException("Invalid URL format");
    }
    this.url = trimmedUrl;
  }

  /**
   * Get the value of the URL
   * @returns The value of the URL
   */
  public getValue(): string {
    return this.url;
  }

  /**
   * Check if the URL is equal to another URL
   * @param other - The other URL to compare
   * @returns True if the URL is equal to another URL, false otherwise
   */
  public equals(other: UrlValueObject): boolean {
    return this.url === other.getValue();
  }
}
