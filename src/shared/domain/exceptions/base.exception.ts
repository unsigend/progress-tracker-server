// import dependencies
import { HttpStatus } from "@nestjs/common";

/**
 * Domain exception class
 * @description Domain exception class
 * @extends Error
 * @property status - The HTTP status code of the exception
 */
export class DomainException extends Error {
  // private properties
  private readonly status: HttpStatus;

  /**
   * Constructor for DomainException
   * @param message - The message of the exception
   * @param status - The HTTP status code of the exception
   */
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.status = status;
  }

  /**
   * Get the status of the exception
   * @returns The HTTP status code of the exception
   */
  public getStatus(): HttpStatus {
    return this.status;
  }
}
