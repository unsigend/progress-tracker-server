// import dependencies
import { DomainException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

/**
 * Permission exception class
 * @description Permission exception class
 */
export class PermissionException extends DomainException {
  /**
   * Constructor for PermissionException
   * @param message - The message of the exception
   */
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
