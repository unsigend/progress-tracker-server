// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

// import enums
import { ReadingStatus } from "@domain/entities/user-book.entity";

/**
 * Reading status value object
 * @description Reading status value object
 */
export class ReadingStatusValueObject {
  private readonly readingStatus: ReadingStatus;

  /**
   * Constructor
   * @param readingStatus - The reading status
   */
  constructor(readingStatus: ReadingStatus) {
    if (!readingStatus) {
      throw new ValidationException("Reading status is required");
    }
    if (!Object.values(ReadingStatus).includes(readingStatus)) {
      throw new ValidationException("Invalid reading status");
    }
    this.readingStatus = readingStatus;
  }

  /**
   * Get the value of the reading status
   * @returns The value of the reading status
   */
  public getValue(): ReadingStatus {
    return this.readingStatus;
  }

  /**
   * Check if the reading status is equal to another reading status
   * @param other - The other reading status to compare
   * @returns True if the reading status is equal to another readingStatus, false otherwise
   */
  public equals(other: ReadingStatusValueObject): boolean {
    return this.readingStatus === other.getValue();
  }

  /**
   * Check if the reading status is in progress
   * @returns True if the reading status is in progress, false otherwise
   */
  public isInProgress(): boolean {
    return this.readingStatus === ReadingStatus.IN_PROGRESS;
  }

  /**
   * Check if the reading status is completed
   * @returns True if the reading status is completed, false otherwise
   */
  public isCompleted(): boolean {
    return this.readingStatus === ReadingStatus.COMPLETED;
  }
}
