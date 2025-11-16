import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { RecordTypeValueObject } from "../value-object/record-type.vo";
import { MinutesValueObject } from "@/modules/reading/domain/object-value/minutes.vo";

/**
 * Course recording entity
 * @description Course recording entity which is used to store the course recording information.
 */
export class CourseRecordingEntity {
  // required properties
  private readonly id: ObjectIdValueObject;
  private readonly userCourseId: ObjectIdValueObject;
  private readonly date: Date;
  private minutes: MinutesValueObject;
  private notes: string | null;
  private readonly recordType: RecordTypeValueObject;

  // private constructor
  private constructor(
    userCourseId: ObjectIdValueObject,
    date: Date,
    minutes: number,
    recordType: RecordTypeValueObject,
    notes?: string | null,
  ) {
    this.id = new ObjectIdValueObject();
    this.userCourseId = userCourseId;
    this.date = date;
    this.minutes = new MinutesValueObject(minutes);
    this.recordType = recordType;
    this.notes = notes ?? null;
  }

  /**
   * Create a new course recording entity
   * @param userCourseId - The user course id
   * @param date - The date
   * @param minutes - The minutes
   * @param recordType - The record type
   * @param notes - The notes
   * @returns The course recording entity
   */
  public static create(
    userCourseId: ObjectIdValueObject,
    date: Date,
    minutes: number,
    recordType: RecordTypeValueObject,
    notes?: string | null,
  ): CourseRecordingEntity {
    return new CourseRecordingEntity(
      userCourseId,
      date,
      minutes,
      recordType,
      notes,
    );
  }

  /**
   * Reconstitute a course recording entity
   * @param id - The id
   * @param userCourseId - The user course id
   * @param date - The date
   * @param minutes - The minutes
   * @param recordType - The record type
   * @param notes - The notes
   * @returns The course recording entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    userCourseId: ObjectIdValueObject,
    date: Date,
    minutes: number,
    recordType: RecordTypeValueObject,
    notes?: string | null,
  ): CourseRecordingEntity {
    return new CourseRecordingEntity(
      userCourseId,
      date,
      minutes,
      recordType,
      notes,
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
   * Get the user course id
   * @returns The user course id
   */
  public getUserCourseId(): ObjectIdValueObject {
    return this.userCourseId;
  }

  /**
   * Get the date
   * @returns The date
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Get the minutes
   * @returns The minutes
   */
  public getMinutes(): MinutesValueObject {
    return this.minutes;
  }

  /**
   * Get the record type
   * @returns The record type value object
   */
  public getRecordType(): RecordTypeValueObject {
    return this.recordType;
  }

  /**
   * Get the notes
   * @returns The notes
   */
  public getNotes(): string | null {
    return this.notes;
  }

  /**
   * Set the notes
   * @param notes - The notes
   */
  public setNotes(notes: string | null): void {
    this.notes = notes;
  }

  /**
   * Merge a course recording
   * @param minutes - The minutes
   * @param notes - The notes
   */
  public merge(minutes: number, notes: string | null): void {
    this.minutes = new MinutesValueObject(this.minutes.getMinutes() + minutes);
    if (notes) {
      this.notes = notes;
    }
  }
}
