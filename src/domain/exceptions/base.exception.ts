// import dependencies
import { HttpStatus } from "@nestjs/common";

/**
 * Domain exception class
 * @description Domain exception class
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
}
