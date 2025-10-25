// import dependencies
import { HttpStatus } from "@nestjs/common";
import { DomainException } from "./base.exception";

/**
 * Not found exception class
 * @description Not found exception class
 */
export class NotFoundException extends DomainException {
  /**
   * Constructor for NotFoundException
   * @param message - The message of the exception
   */
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
