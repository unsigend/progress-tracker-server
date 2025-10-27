// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { PagesValueObject } from "../object-value/pages.vo";
import { MinutesValueObject } from "../object-value/minutes.vo";

/**
 * Recording entity
 * @description Recording entity which is used to store the recording information.
 */
export class RecordingEntity {
  // required properties
  private readonly id: ObjectIdValueObject;
  private readonly userBookId: ObjectIdValueObject;
  private readonly date: Date;
  private pages: PagesValueObject;
  private minutes: MinutesValueObject;
  private notes: string | null;

  // private constructor
  private constructor(
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PagesValueObject,
    id?: ObjectIdValueObject | null,
    minutes?: MinutesValueObject | null,
    notes?: string | null,
  ) {
    this.id = id ?? new ObjectIdValueObject();
    this.userBookId = userBookId;
    this.date = date;
    this.pages = pages;
    this.minutes = minutes ?? new MinutesValueObject(0);
    this.notes = notes ?? null;
  }

  /**
   * Create a new recording
   * @param userBookId - The user book id
   * @param date - The date
   * @param pages - The pages
   * @param minutes - The minutes
   * @param notes - The notes
   * @returns The recording entity
   */
  public static create(
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PagesValueObject,
    minutes?: MinutesValueObject | null,
    notes?: string | null,
  ): RecordingEntity {
    return new RecordingEntity(userBookId, date, pages, null, minutes, notes);
  }

  /**
   * Reconstitute a recording
   * @param id - The id
   * @param userBookId - The user book id
   * @param date - The date
   * @param pages - The pages
   * @param minutes - The minutes
   * @param notes - The notes
   * @returns The recording entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PagesValueObject,
    minutes: MinutesValueObject,
    notes: string | null,
  ): RecordingEntity {
    return new RecordingEntity(userBookId, date, pages, id, minutes, notes);
  }

  /**
   * Get the id
   * @returns The id
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the user book id
   * @returns The user book id
   */
  public getUserBookId(): ObjectIdValueObject {
    return this.userBookId;
  }

  /**
   * Get the date
   * @returns The date
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Get the pages
   * @returns The pages
   */
  public getPages(): PagesValueObject {
    return this.pages;
  }

  /**
   * Get the minutes
   * @returns The minutes
   */
  public getMinutes(): MinutesValueObject {
    return this.minutes;
  }

  /**
   * Get the notes
   * @returns The notes
   */
  public getNotes(): string | null {
    return this.notes;
  }

  /**
   * Set the pages
   * @param pages - The pages
   */
  public setPages(pages: PagesValueObject): void {
    this.pages = pages;
  }

  /**
   * Set the minutes
   * @param minutes - The minutes
   */
  public setMinutes(minutes: MinutesValueObject): void {
    this.minutes = minutes;
  }

  /**
   * Set the notes
   * @param notes - The notes
   */
  public setNotes(notes: string | null): void {
    this.notes = notes;
  }

  /**
   * Merge a recording
   * @param recording - The recording
   */
  public merge(recording: RecordingEntity): void {
    this.pages = new PagesValueObject(
      this.pages.getPages() + recording.pages.getPages(),
    );
    this.minutes = new MinutesValueObject(
      this.minutes.getMinutes() + recording.minutes.getMinutes(),
    );
    // replace the notes using new recording notes
    if (recording.notes) {
      this.notes = recording.notes;
    }
  }
}
