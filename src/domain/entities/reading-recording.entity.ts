// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

/**
 * Reading recording entity
 * @description Reading recording entity
 */
export class ReadingRecordingEntity {
  // required fields
  private readonly id: ObjectIdValueObject;
  private readonly userBookId: ObjectIdValueObject;
  private date: Date;
  private pages: PageValueObject;
  private minutes: MinuteValueObject;

  // optional fields
  private notes: string | null;

  /**
   * Private constructor used by the factory methods
   */
  private constructor(
    id: ObjectIdValueObject,
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PageValueObject,
    minutes: MinuteValueObject,
    notes?: string | null,
  ) {
    this.id = id;
    this.userBookId = userBookId;
    this.date = date;
    this.pages = pages;
    this.minutes = minutes;
    this.notes = notes ?? null;
  }

  /**
   * Factory method to create a new reading recording entity
   * @description Create a new reading recording entity
   */
  public static create(
    userBookId: ObjectIdValueObject,
    date: Date | null,
    pages: PageValueObject,
    minutes: MinuteValueObject,
    notes?: string | null,
  ): ReadingRecordingEntity {
    return new ReadingRecordingEntity(
      new ObjectIdValueObject(),
      userBookId,
      date ?? new Date(),
      pages,
      minutes,
      notes ?? null,
    );
  }

  /**
   * Factory method to reconstitute a reading recording entity
   * @description Reconstitute a reading recording entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PageValueObject,
    minutes: MinuteValueObject,
    notes?: string | null,
  ): ReadingRecordingEntity {
    return new ReadingRecordingEntity(
      id,
      userBookId,
      date,
      pages,
      minutes,
      notes ?? null,
    );
  }

  /**
   * Merge a reading recording entity with another reading recording entity
   * @description Merge a reading recording entity with another reading recording entity
   * @param other - The other reading recording entity to be merged
   */
  public merge(other: ReadingRecordingEntity): void {
    // merge the pages
    this.pages = new PageValueObject(
      this.pages.getValue() + other.pages.getValue(),
    );

    // merge the minutes
    this.minutes = new MinuteValueObject(
      this.minutes.getValue() + other.minutes.getValue(),
    );

    // merge the notes and drop current notes
    if (other.notes) {
      this.notes = other.notes;
    }
  }

  /**
   * Get the id of the reading recording entity
   * @returns The id of the reading recording entity
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the user book id of the reading recording entity
   * @returns The user book id of the reading recording entity
   */
  public getUserBookId(): ObjectIdValueObject {
    return this.userBookId;
  }

  /**
   * Get the date of the reading recording entity
   * @returns The date of the reading recording entity
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Get the pages of the reading recording entity
   * @returns The pages of the reading recording entity
   */
  public getPages(): PageValueObject {
    return this.pages;
  }

  /**
   * Get the minutes of the reading recording entity
   * @returns The minutes of the reading recording entity
   */
  public getMinutes(): MinuteValueObject {
    return this.minutes;
  }

  /**
   * Get the notes of the reading recording entity
   * @returns The notes of the reading recording entity
   */
  public getNotes(): string | null {
    return this.notes;
  }

  /**
   * Set the date of the reading recording entity
   * @param date - The date to be set
   */
  public setDate(date: Date): void {
    this.date = date;
  }

  /**
   * Set the pages of the reading recording entity
   * @param pages - The pages to be set
   */
  public setPages(pages: PageValueObject): void {
    this.pages = pages;
  }

  /**
   * Set the minutes of the reading recording entity
   * @param minutes - The minutes to be set
   */
  public setMinutes(minutes: MinuteValueObject): void {
    this.minutes = minutes;
  }

  /**
   * Set the notes of the reading recording entity
   * @param notes - The notes to be set
   */
  public setNotes(notes: string | null): void {
    this.notes = notes;
  }

  /**
   * Delete the reading recording entity
   * @description Delete the reading recording entity
   */
  public delete(): void {
    // Soft delete here nothing to do
    // Just keep API consistency
    return;
  }
}
