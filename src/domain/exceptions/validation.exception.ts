// import dependencies
import { DomainException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

/**
 * Validation exception class
 * @description Validation exception class
 */
export class ValidationException extends DomainException {
  /**
   * Constructor for ValidationException
   * @param message - The message of the exception
   */
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
