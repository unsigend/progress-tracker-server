// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Minute value object
 * @description Minute value object
 */
export class MinuteValueObject {
  private readonly minute: number;
  private readonly MIN_MINUTE = 0 as const;

  /**
   * Constructor
   * @param minute - The minute to be validated
   */
  constructor(minute: number) {
    if (!minute) {
      throw new ValidationException("Minute is required");
    }
    if (minute < this.MIN_MINUTE) {
      throw new ValidationException(
        `Minute must be greater than ${this.MIN_MINUTE}`,
      );
    }
    this.minute = minute;
  }

  /**
   * Get the value of the minute
   * @returns The value of the minute
   */
  public getValue(): number {
    return this.minute;
  }

  /**
   * Check if the minute is equal to another minute
   * @param other - The other minute to compare
   * @returns True if the minute is equal to another minute, false otherwise
   */
  public equals(other: MinuteValueObject): boolean {
    return this.minute === other.getValue();
  }
}
