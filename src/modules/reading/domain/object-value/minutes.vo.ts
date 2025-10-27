// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";

/**
 * Minutes value object
 * @description Minutes value object which is used to store the minutes of the book.
 */
export class MinutesValueObject {
  // private properties
  private readonly minutes: number;

  /**
   * Constructor for MinutesValueObject
   * @param minutes - The minutes of the object
   * @throws ValidationException if the minutes is not a valid number
   */
  constructor(minutes: number) {
    if (minutes < 0) {
      throw new ValidationException("Minutes must be greater than 0");
    }
  }

  /**
   * Get the minutes
   * @returns The minutes
   */
  public getMinutes(): number {
    return this.minutes;
  }
}
