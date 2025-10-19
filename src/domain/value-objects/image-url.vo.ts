// image url value object

import { ValidationException } from "@domain/exceptions/validation.exception";

export class ImageUrlValueObject {
  private readonly url: string | null;

  constructor(url?: string | null) {
    if (url) {
      // normalize the url
      const normalizedUrl = url.trim();

      // validate the url
      if (!normalizedUrl.match(/^https?:\/\/.+/)) {
        throw new ValidationException("Invalid image URL");
      }

      this.url = normalizedUrl;
    } else {
      this.url = null;
    }
  }

  /**
   * Get the image url value
   * @returns The image url value
   */
  getValue(): string | null {
    return this.url;
  }

  /**
   * Get the image url value as a string
   * @returns The image url value as a string
   */
  toString(): string {
    return this.url || "";
  }

  /**
   * Check if the image url is equal to another image url
   * @param imageUrl - The image url to check
   * @returns True if the image url is equal to the other image url, false otherwise
   */
  equals(imageUrl: ImageUrlValueObject): boolean {
    return this.url === imageUrl.getValue();
  }

  /**
   * Check if the image url is empty
   * @returns True if the image url is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.url === null;
  }
}
