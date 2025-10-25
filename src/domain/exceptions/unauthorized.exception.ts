// import dependencies
import { DomainException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

/**
 * Unauthorized exception class
 * @description Unauthorized exception class
 */
export class UnauthorizedException extends DomainException {
  /**
   * Constructor for UnauthorizedException
   * @param message - The message of the exception
   */
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
