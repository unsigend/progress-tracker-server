// import dependencies
import { DomainException } from "@domain/exceptions/domain-exception";

/**
 * Unauthorized exception
 * @description Unauthorized exception
 */
export class UnauthorizedException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
