// reading status value object

import { ValidationException } from "@domain/exceptions/validation.exception";

/**
 * This enum is used to store the reading status.
 */
export enum ReadingStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export class ReadingStatusValueObject {
  private readonly readingStatus: ReadingStatus;

  constructor(readingStatus: ReadingStatus) {
    // validate the reading status
    if (!readingStatus) {
      throw new ValidationException("Reading status is required");
    }

    // the reading status must be a valid reading status
    if (!Object.values(ReadingStatus).includes(readingStatus)) {
      throw new ValidationException("Invalid reading status");
    }

    this.readingStatus = readingStatus;
  }

  /**
   * Get the reading status value
   * @returns The reading status value
   */
  getValue(): ReadingStatus {
    return this.readingStatus;
  }

  /**
   * Get the reading status value as a string
   * @returns The reading status value as a string
   */
  toString(): string {
    return this.readingStatus;
  }

  /**
   * Check if the reading status is completed
   * @returns True if the reading status is completed, false otherwise
   */
  isCompleted(): boolean {
    return this.readingStatus === ReadingStatus.COMPLETED;
  }

  /**
   * Check if the reading status is in progress
   * @returns True if the reading status is in progress, false otherwise
   */
  isInProgress(): boolean {
    return this.readingStatus === ReadingStatus.IN_PROGRESS;
  }

  /**
   * Check if the reading status is equal to another reading status
   * @param readingStatus - The reading status to check
   * @returns True if the reading status is equal to the other reading status, false otherwise
   */
  equals(readingStatus: ReadingStatusValueObject): boolean {
    return this.readingStatus === readingStatus.getValue();
  }
}
