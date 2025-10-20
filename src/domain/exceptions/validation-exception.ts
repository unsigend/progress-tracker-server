// import dependencies
import { DomainException } from "@domain/exceptions/domain-exception";

/**
 * Validation exception
 * @description Validation exception
 */
export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
