import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * User course status enum
 * @description User course status enum which is used to store the user course status.
 */
export enum UserCourseStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

/**
 * User course entity
 * @description User course entity which is used to store the user course information.
 */
export class UserCourseEntity {
  // required properties
  private readonly id: ObjectIdValueObject;
  private readonly courseId: ObjectIdValueObject;
  private readonly userId: ObjectIdValueObject;
  private status: UserCourseStatus;
  private startDate: Date | null;
  private completedDate: Date | null;
  private totalMinutes: number;
  private totalDays: number;
  private readonly createdAt: Date;
  private updatedAt: Date;

  // private constructor
  private constructor(
    courseId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    status: UserCourseStatus,
    id?: ObjectIdValueObject | null,
    startDate?: Date | null,
    completedDate?: Date | null,
    totalMinutes?: number | null,
    totalDays?: number | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ) {
    this.id = id ?? new ObjectIdValueObject();
    this.courseId = courseId;
    this.userId = userId;
    this.status = status;
    this.startDate = startDate ?? null;
    this.completedDate = completedDate ?? null;
    this.totalMinutes = totalMinutes ?? 0;
    this.totalDays = totalDays ?? 0;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  /**
   * Create a new user course
   * @param courseId - The course id
   * @param userId - The user id
   * @param status - The status
   * @param startDate - The start date
   * @param completedDate - The completed date
   * @param totalMinutes - The total minutes
   * @param totalDays - The total days
   * @param createdAt - The created at
   * @param updatedAt - The updated at
   * @returns The user course entity
   */
  public static create(
    courseId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    status?: UserCourseStatus | null,
    startDate?: Date | null,
    completedDate?: Date | null,
    totalMinutes?: number | null,
    totalDays?: number | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ): UserCourseEntity {
    return new UserCourseEntity(
      courseId,
      userId,
      status ?? UserCourseStatus.IN_PROGRESS,
      null,
      startDate,
      completedDate,
      totalMinutes,
      totalDays,
      createdAt,
      updatedAt,
    );
  }

  /**
   * Reconstitute a user course
   * @param id - The id of the user course
   * @param courseId - The id of the course
   * @param userId - The id of the user
   * @param status - The status of the user course
   * @param startDate - The start date of the user course
   * @param completedDate - The completed date of the user course
   * @param totalMinutes - The total minutes of the user course
   * @param totalDays - The total days of the user course
   * @param createdAt - The created at of the user course
   * @param updatedAt - The updated at of the user course
   * @returns The user course entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    courseId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
    status: UserCourseStatus,
    startDate: Date | null,
    completedDate: Date | null,
    totalMinutes: number,
    totalDays: number,
    createdAt: Date,
    updatedAt: Date,
  ): UserCourseEntity {
    return new UserCourseEntity(
      courseId,
      userId,
      status,
      id,
      startDate,
      completedDate,
      totalMinutes,
      totalDays,
      createdAt,
      updatedAt,
    );
  }

  /**
   * Get the id of the user course
   * @returns The id of the user course
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the course id of the user course
   * @returns The course id of the user course
   */
  public getCourseId(): ObjectIdValueObject {
    return this.courseId;
  }

  /**
   * Get the user id of the user course
   * @returns The user id of the user course
   */
  public getUserId(): ObjectIdValueObject {
    return this.userId;
  }

  /**
   * Get the status of the user course
   * @returns The status of the user course
   */
  public getStatus(): UserCourseStatus {
    return this.status;
  }

  /**
   * Get the start date of the user course
   * @returns The start date of the user course
   */
  public getStartDate(): Date | null {
    return this.startDate;
  }

  /**
   * Get the completed date of the user course
   * @returns The completed date of the user course
   */
  public getCompletedDate(): Date | null {
    return this.completedDate;
  }

  /**
   * Get the total minutes of the user course
   * @returns The total minutes of the user course
   */
  public getTotalMinutes(): number {
    return this.totalMinutes;
  }

  /**
   * Get the total days of the user course
   * @returns The total days of the user course
   */
  public getTotalDays(): number {
    return this.totalDays;
  }

  /**
   * Get the created at of the user course
   * @returns The created at of the user course
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at of the user course
   * @returns The updated at of the user course
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Mark the user course as complete
   * @returns The user course entity
   */
  public markAsComplete(): void {
    if (this.status === UserCourseStatus.IN_PROGRESS && !this.completedDate) {
      this.completedDate = new Date();
      this.status = UserCourseStatus.COMPLETED;
      this.updatedAt = new Date();
    }
  }

  /**
   * Add minutes to the user course
   * @param minutes - The minutes to add
   */
  public addMinutes(minutes: number): void {
    this.totalMinutes = this.totalMinutes + minutes;
    this.updatedAt = new Date();
  }

  /**
   * Add days to the user course
   * @param days - The days to add
   */
  public addDays(days: number): void {
    this.totalDays = this.totalDays + days;
    this.updatedAt = new Date();
  }
}
