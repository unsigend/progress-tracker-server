// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * File value object
 * @description File value object
 */
export class FileValueObject {
  protected readonly buffer: Buffer;
  protected readonly mimeType: string;
  protected readonly size: number;

  /**
   * Constructor
   * @param buffer - The buffer of the file
   * @param mimeType - The mime type of the file
   */
  constructor(buffer: Buffer, mimeType: string) {
    // if the buffer is not provided, throw an error
    if (!buffer || buffer.length === 0) {
      throw new ValidationException("Buffer is required");
    }
    // if the mime type is not provided, throw an error
    if (!mimeType) {
      throw new ValidationException("Mime type is required");
    }
    this.buffer = buffer;
    this.mimeType = mimeType;
    this.size = buffer.length;
  }

  /**
   * Get the buffer of the file
   * @returns The buffer of the file
   */
  public getBuffer(): Buffer {
    return this.buffer;
  }

  /**
   * Get the mime type of the file
   * @returns The mime type of the file
   */
  public getMimeType(): string {
    return this.mimeType;
  }

  /**
   * Get the size of the file
   * @returns The size of the file
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Get the extension of the file
   * @returns The extension of the file
   */
  public getExtension(): string {
    return this.mimeType.split("/")[1];
  }
}
