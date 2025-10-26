// import dependencies
import { DomainException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

/**
 * Conflict exception class
 * @description Conflict exception class
 */
export class ConflictException extends DomainException {
  /**
   * Constructor for ConflictException
   * @param message - The message of the exception
   */
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
