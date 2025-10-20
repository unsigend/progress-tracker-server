// import dependencies
import { DomainException } from "@domain/exceptions/domain-exception";

/**
 * Not found exception
 * @description Not found exception
 */
export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
