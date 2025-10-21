// import dependencies
import { DomainException } from "@domain/exceptions/domain-exception";

/**
 * Conflict exception
 * @description Conflict exception
 */
export class ConflictException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
