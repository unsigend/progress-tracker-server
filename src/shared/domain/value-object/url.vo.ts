// import dependencies
import { ValidationException } from "../exceptions/validation.exception";
import { isURL } from "class-validator";

/**
 * URL value object
 * @description URL value object which is used to store the URL.
 */
export class UrlValueObject {
  // private properties
  private readonly url: string;

  /**
   * Constructor for UrlValueObject
   * @param url - The URL of the object
   * @throws ValidationException if the URL is not a valid URL
   */
  constructor(url: string) {
    if (!url?.trim() || !isURL(url)) {
      throw new ValidationException("Invalid URL");
    }
    this.url = url.trim();
  }

  /**
   * Get the URL
   * @returns The URL
   */
  public getUrl(): string {
    return this.url;
  }
}
