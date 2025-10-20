// domain exception object

export class DomainException extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly
    Object.setPrototypeOf(this, DomainException.prototype);

    // Set the error name to the class name
    this.name = this.constructor.name;

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
