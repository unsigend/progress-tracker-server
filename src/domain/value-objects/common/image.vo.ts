// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";
import { FileValueObject } from "@domain/value-objects/common/file.vo";

/**
 * Image value object
 * @description Image value object
 */
export class ImageValueObject extends FileValueObject {
  private readonly ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ] as const;
  // the max size of the image is 10MB
  private readonly MAX_SIZE = 10 * 1024 * 1024;

  /**
   * Constructor
   * @param image - The image to be validated
   */
  constructor(buffer: Buffer, mimeType: string) {
    super(buffer, mimeType);

    // image specific validation
    if (buffer.length > this.MAX_SIZE) {
      throw new ValidationException(
        `Image is too large Max size is ${this.MAX_SIZE / 1024 / 1024}MB`,
      );
    }
    if (
      !this.ALLOWED_MIME_TYPES.includes(
        mimeType as (typeof this.ALLOWED_MIME_TYPES)[number],
      )
    ) {
      throw new ValidationException(
        `Invalid image mime type, allowed types are: ${this.ALLOWED_MIME_TYPES.join(", ")}`,
      );
    }
  }

  /**
   * Check if the image is a JPEG image
   * @returns True if the image is a JPEG image, false otherwise
   */
  public isJpeg(): boolean {
    return this.getMimeType() === "image/jpeg";
  }

  /**
   * Check if the image is a PNG image
   * @returns True if the image is a PNG image, false otherwise
   */
  public isPng(): boolean {
    return this.getMimeType() === "image/png";
  }

  /**
   * Check if the image is a GIF image
   * @returns True if the image is a GIF image, false otherwise
   */
  public isGif(): boolean {
    return this.getMimeType() === "image/gif";
  }

  /**
   * Check if the image is a WebP image
   * @returns True if the image is a WebP image, false otherwise
   */
  public isWebp(): boolean {
    return this.getMimeType() === "image/webp";
  }
}
