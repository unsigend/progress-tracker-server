// domain validation exception object
import { DomainException } from "@domain/exceptions/domain-exception";

export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
