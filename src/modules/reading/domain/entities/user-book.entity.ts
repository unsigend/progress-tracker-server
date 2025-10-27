// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { MinutesValueObject } from "../object-value/minutes.vo";
import { PagesValueObject } from "../object-value/pages.vo";

/**
 * Reading status
 * @description Reading status which is used to store the reading status.
 */
export enum ReadingStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

/**
 * Add recording action
 * @description Add recording action which is used to store the add recording action.
 */
export enum AddRecordingAction {
  INCREASE = "INCREASE",
  SET = "SET",
}
/**
 * User book entity
 * @description User book entity which is used to store the user book data
 */
export class UserBookEntity {
  // required properties
  private readonly id: ObjectIdValueObject;
  private readonly bookId: ObjectIdValueObject;
  private readonly userId: ObjectIdValueObject;
  private status: ReadingStatus;
  private currentPage: PagesValueObject;
  private startDate: Date | null;
  private completedDate: Date | null;
  private totalMinutes: MinutesValueObject;
  private totalDays: number;
  private readonly createdAt: Date;
  private updatedAt: Date;

  // private constructor
  private constructor(
    bookId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    status?: ReadingStatus | null,
    id?: ObjectIdValueObject | null,
    currentPage?: PagesValueObject | null,
    startDate?: Date | null,
    completedDate?: Date | null,
    totalMinutes?: MinutesValueObject | null,
    totalDays?: number | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ) {
    this.id = id ?? new ObjectIdValueObject();
    this.bookId = bookId;
    this.userId = userId;
    this.status = status ?? ReadingStatus.IN_PROGRESS;
    this.currentPage = currentPage ?? new PagesValueObject(0);
    this.startDate = startDate ?? null;
    this.completedDate = completedDate ?? null;
    this.totalMinutes = totalMinutes ?? new MinutesValueObject(0);
    this.totalDays = totalDays ?? 0;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  /**
   * Create a new user book
   * @param bookId - The book id
   * @param userId - The user id
   * @param status - The status
   * @param currentPage - The current page
   * @param startDate - The start date
   * @param completedDate - The completed date
   * @param totalMinutes - The total minutes
   * @param totalDays - The total days
   * @param createdAt - The created at
   * @param updatedAt - The updated at
   * @returns The user book entity
   */
  public static create(
    bookId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    status?: ReadingStatus | null,
    currentPage?: PagesValueObject | null,
    startDate?: Date | null,
    completedDate?: Date | null,
    totalMinutes?: MinutesValueObject | null,
    totalDays?: number | null,
  ): UserBookEntity {
    return new UserBookEntity(
      bookId,
      userId,
      status,
      null,
      currentPage,
      startDate,
      completedDate,
      totalMinutes,
      totalDays,
    );
  }

  /**
   * Reconstitute a user book
   * @param id - The id
   * @param bookId - The book id
   * @param userId - The user id
   * @param status - The status
   * @param currentPage - The current page
   * @param startDate - The start date
   * @param completedDate - The completed date
   * @param totalMinutes - The total minutes
   * @param totalDays - The total days
   * @param createdAt - The created at
   * @param updatedAt - The updated at
   * @returns The user book entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    bookId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    status: ReadingStatus,
    currentPage: PagesValueObject,
    startDate: Date | null,
    completedDate: Date | null,
    totalMinutes: MinutesValueObject,
    totalDays: number,
    createdAt: Date,
    updatedAt: Date,
  ): UserBookEntity {
    return new UserBookEntity(
      bookId,
      userId,
      status,
      id,
      currentPage,
      startDate,
      completedDate,
      totalMinutes,
      totalDays,
      createdAt,
      updatedAt,
    );
  }

  /**
   * Get the id
   * @returns The id
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the book id
   * @returns The book id
   */
  public getBookId(): ObjectIdValueObject {
    return this.bookId;
  }

  /**
   * Get the user id
   * @returns The user id
   */
  public getUserId(): ObjectIdValueObject {
    return this.userId;
  }

  /**
   * Get the status
   * @returns The status
   */
  public getStatus(): ReadingStatus {
    return this.status;
  }

  /**
   * Get the current page
   * @returns The current page
   */
  public getCurrentPage(): PagesValueObject {
    return this.currentPage;
  }

  /**
   * Get the start date
   * @returns The start date
   */
  public getStartDate(): Date | null {
    return this.startDate;
  }

  /**
   * Get the completed date
   * @returns The completed date
   */
  public getCompletedDate(): Date | null {
    return this.completedDate;
  }

  /**
   * Get the total minutes
   * @returns The total minutes
   */
  public getTotalMinutes(): MinutesValueObject {
    return this.totalMinutes;
  }

  /**
   * Get the total days
   * @returns The total days
   */
  public getTotalDays(): number {
    return this.totalDays;
  }

  /**
   * Get the created at
   * @returns The created at
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at
   * @returns The updated at
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Set the status
   * @param status - The status
   */
  public setStatus(status: ReadingStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  /**
   * Set the current page
   * @param currentPage - The current page
   */
  public setCurrentPage(currentPage: PagesValueObject): void {
    this.currentPage = currentPage;
    this.updatedAt = new Date();
  }

  /**
   * Set the start date
   * @param startDate - The start date
   */
  public setStartDate(startDate: Date): void {
    this.startDate = startDate;
    this.updatedAt = new Date();
  }

  /**
   * Set the completed date
   * @param completedDate - The completed date
   */
  public setCompletedDate(completedDate: Date): void {
    this.completedDate = completedDate;
    this.updatedAt = new Date();
  }

  /**
   * Set the total minutes
   * @param totalMinutes - The total minutes
   */
  public setTotalMinutes(totalMinutes: MinutesValueObject): void {
    this.totalMinutes = totalMinutes;
    this.updatedAt = new Date();
  }

  /**
   * Set the total days
   * @param totalDays - The total days
   */
  public setTotalDays(totalDays: number): void {
    this.totalDays = totalDays;
    this.updatedAt = new Date();
  }

  /**
   * Set the updated at
   * @param updatedAt - The updated at
   */
  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  /**
   * Mark the book as completed
   * @param date - The date
   */
  public markAsCompleted(date: Date): void {
    // only if the book is in progress and not completed will be marked as completed
    if (this.status === ReadingStatus.IN_PROGRESS && !this.completedDate) {
      this.completedDate = date;
      this.status = ReadingStatus.COMPLETED;
      this.updatedAt = new Date();
    }
  }

  /**
   * Check if the book is completed
   * @returns True if the book is completed, false otherwise
   */
  public isCompleted(): boolean {
    return this.status === ReadingStatus.COMPLETED;
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
    pages: PagesValueObject,
    minutes: MinutesValueObject,
    isNewDay: boolean,
    action: AddRecordingAction = AddRecordingAction.INCREASE,
  ): void {
    // update data
    if (action === AddRecordingAction.INCREASE) {
      this.totalMinutes = new MinutesValueObject(
        this.totalMinutes.getMinutes() + minutes.getMinutes(),
      );
      this.currentPage = new PagesValueObject(
        this.currentPage.getPages() + pages.getPages(),
      );
    } else {
      this.totalMinutes = minutes;
      this.currentPage = pages;
    }

    // Only increase the total days if the day is new
    if (isNewDay) {
      this.totalDays++;
    }

    // set the start date is just start the book
    if (!this.startDate) {
      this.startDate = date;
    }

    this.updatedAt = new Date();
  }
}
