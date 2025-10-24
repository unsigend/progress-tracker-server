// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { ReadingStatusValueObject } from "@domain/value-objects/user-book/reading-status.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

/**
 * Reading status enum
 * @description Reading status enum
 */
export enum ReadingStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum AddRecordingAction {
  INCREASE = "INCREASE",
  SET = "SET",
}

/**
 * User book entity
 * @description User book entity
 */
export class UserBookEntity {
  // required fields
  private readonly id: ObjectIdValueObject;
  private readonly userId: ObjectIdValueObject;
  private readonly bookId: ObjectIdValueObject;
  private readingStatus: ReadingStatusValueObject;
  private currentPage: PageValueObject;
  private startDate: Date | null;
  private completedDate: Date | null;
  private totalMinutes: number;
  private totalDays: number;
  private createdAt: Date;
  private updatedAt: Date;

  /**
   * Private constructor used by the factory methods
   */
  private constructor(
    id: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    bookId: ObjectIdValueObject,
    readingStatus: ReadingStatusValueObject,
    currentPage: PageValueObject,
    startDate: Date | null,
    completedDate: Date | null,
    totalMinutes: number,
    totalDays: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.readingStatus = readingStatus;
    this.currentPage = currentPage;
    this.startDate = startDate;
    this.completedDate = completedDate;
    this.totalMinutes = totalMinutes;
    this.totalDays = totalDays;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Factory method to create a new user book entity
   * @description Create a new user book entity
   */
  public static create(
    userId: ObjectIdValueObject,
    bookId: ObjectIdValueObject,
    readingStatus: ReadingStatusValueObject,
    currentPage: PageValueObject,
    startDate: Date | null,
    completedDate: Date | null,
    totalMinutes: number,
    totalDays: number,
  ): UserBookEntity {
    return new UserBookEntity(
      new ObjectIdValueObject(),
      userId,
      bookId,
      readingStatus,
      currentPage,
      startDate ?? null,
      completedDate ?? null,
      totalMinutes,
      totalDays,
      new Date(),
      new Date(),
    );
  }

  /**
   * Factory method to reconstitute a user book entity
   * @description Reconstitute a user book entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    bookId: ObjectIdValueObject,
    readingStatus: ReadingStatusValueObject,
    currentPage: PageValueObject,
    startDate: Date | null,
    completedDate: Date | null,
    totalMinutes: number,
    totalDays: number,
    createdAt: Date,
    updatedAt: Date,
  ): UserBookEntity {
    return new UserBookEntity(
      id,
      userId,
      bookId,
      readingStatus,
      currentPage,
      startDate ?? null,
      completedDate ?? null,
      totalMinutes,
      totalDays,
      createdAt,
      updatedAt,
    );
  }

  /**
   * Add a reading recording to the user book
   * @description Add a reading recording to the user book
   * @param date - The date of the recording
   * @param pages - The pages of the recording
   * @param minutes - The minutes of the recording
   * @param isNewDay - Whether the day is new
   * @param action - The action to be performed
   */
  public addRecording(
    date: Date,
    pages: PageValueObject,
    minutes: MinuteValueObject,
    isNewDay: boolean,
    action: AddRecordingAction = AddRecordingAction.INCREASE,
  ): void {
    // update data
    if (action === AddRecordingAction.INCREASE) {
      this.totalMinutes += minutes.getValue();
      this.currentPage = new PageValueObject(
        this.currentPage.getValue() + pages.getValue(),
      );
    } else {
      this.totalMinutes = minutes.getValue();
      this.currentPage = pages;
    }

    // Only increase the total days if the day is new
    if (isNewDay) {
      this.totalDays++;
    }

    // set the start date if not set
    if (!this.startDate) {
      this.startDate = date;
    }

    this.updatedAt = new Date();
  }

  /**
   * Check if the user book is completed
   * @description Check if the user book is completed
   * @param totalPages - The total pages of the book
   * @returns True if the user book is completed, false otherwise
   */
  public isCompleted(totalPages: PageValueObject): boolean {
    return this.currentPage.getValue() >= totalPages.getValue();
  }

  /**
   * Mark the user book as completed
   * @description Mark the user book as completed
   * @param completedDate - The date the book was completed
   */
  public markAsCompleted(completedDate: Date): void {
    if (this.readingStatus.isCompleted()) {
      return;
    }
    this.completedDate = completedDate;
    this.readingStatus = new ReadingStatusValueObject(ReadingStatus.COMPLETED);
    this.updatedAt = new Date();
  }

  /**
   * Get the id of the user book
   * @returns The id of the user book
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the user of the user book
   * @returns The user of the user book
   */
  public getUserId(): ObjectIdValueObject {
    return this.userId;
  }

  /**
   * Get the book of the user book
   * @returns The book of the user book
   */
  public getBookId(): ObjectIdValueObject {
    return this.bookId;
  }

  /**
   * Get the reading status of the user book
   * @returns The reading status of the user book
   * @return Constants The reading status of the user book
   */
  public getReadingStatus(): ReadingStatusValueObject {
    return this.readingStatus;
  }

  /**
   * Get the current page of the user
   * @returns The current page of the user
   */
  public getCurrentPage(): PageValueObject {
    return this.currentPage;
  }

  /**
   * Get the start date of the user book
   * @returns The start date of the user book
   */
  public getStartDate(): Date | null {
    return this.startDate;
  }

  /**
   * Get the completed date of the user book
   * @returns The completed date of the user book
   */
  public getCompletedDate(): Date | null {
    return this.completedDate;
  }

  /**
   * Get the total minutes of the user book
   * @returns The total minutes of the user book
   */
  public getTotalMinutes(): number {
    return this.totalMinutes;
  }

  /**
   * Get the total days of the user book
   * @returns The total days of the user book
   */
  public getTotalDays(): number {
    return this.totalDays;
  }

  /**
   * Get the created at date of the user book
   * @returns The created at date of the user book
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at date of the user book
   * @returns The updated at date of the user book
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Set the reading status of the user book
   * @param readingStatus - The reading status to be set
   */
  public setReadingStatus(readingStatus: ReadingStatusValueObject): void {
    this.readingStatus = readingStatus;
    this.updatedAt = new Date();
  }

  /**
   * Set the current page of the user book
   * @param currentPage - The current page to be set
   */
  public setCurrentPage(currentPage: PageValueObject): void {
    this.currentPage = currentPage;
    this.updatedAt = new Date();
  }

  /**
   * Set the start date of the user book
   * @param startDate - The start date to be set
   */
  public setStartDate(startDate: Date): void {
    this.startDate = startDate;
    this.updatedAt = new Date();
  }

  /**
   * Set the completed date of the user book
   * @param completedDate - The completed date to be set
   */
  public setCompletedDate(completedDate: Date): void {
    this.completedDate = completedDate;
    this.updatedAt = new Date();
  }

  /**
   * Set the total minutes of the user book
   * @param totalMinutes - The total minutes to be set
   */
  public setTotalMinutes(totalMinutes: number): void {
    this.totalMinutes = totalMinutes;
    this.updatedAt = new Date();
  }

  /**
   * Set the total days of the user book
   * @param totalDays - The total days to be set
   */
  public setTotalDays(totalDays: number): void {
    this.totalDays = totalDays;
    this.updatedAt = new Date();
  }

  /**
   * Set the created at date of the user book
   * @param createdAt - The created at date to be set
   */
  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }

  /**
   * Set the updated at date of the user book
   * @param updatedAt - The updated at date to be set
   */
  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  /**
   * Delete the user book
   * @description Delete the user book
   */
  public delete(): void {
    // Soft delete here nothing to do
    // Just keep API consistency
    return;
  }
}
