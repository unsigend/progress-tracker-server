// import dependencies
import { DomainException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

/**
 * Server exception class
 * @description Server exception class
 */
export class ServerException extends DomainException {
  /**
   * Constructor for ServerException
   * @param message - The message of the exception
   */
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
