// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import queries
import { ReadingRecordingQuery } from "@domain/repositories/queries/reading-recording.query";

/**
 * Reading recording repository token
 * @description Reading recording repository token
 */
export const READING_RECORDING_REPOSITORY_TOKEN = Symbol(
  "READING_RECORDING_REPOSITORY_TOKEN",
);

/**
 * Reading recording repository interface
 * @description Reading recording repository interface
 */
export interface IReadingRecordingRepository {
  /**
   * Save a reading recording updates or creates a new reading recording
   * @description Save a reading recording
   * @param readingRecording - The reading recording to be saved
   */
  save(readingRecording: ReadingRecordingEntity): Promise<void>;

  /**
   * Find a reading recording by id
   * @description Find a reading recording by id
   * @param id - The id of the reading recording to be found
   * @returns The reading recording or null if not found
   */
  findById(id: ObjectIdValueObject): Promise<ReadingRecordingEntity | null>;

  /**
   * Find all reading recordings
   * @description Find all reading recordings
   * @param query - The query to be used to find the reading recordings
   * @returns The reading recordings and total count
   */
  findAll(query: ReadingRecordingQuery): Promise<{
    readingRecordings: ReadingRecordingEntity[];
    totalCount: number;
  }>;

  /**
   * Delete a reading recording
   * @description Delete a reading recording
   * @param id - The id of the reading recording to be deleted
   */
  delete(id: ObjectIdValueObject): Promise<void>;

  /**
   * Delete all reading recordings by user book id
   * @description Delete all reading recordings by user book id
   * @param userBookId - The id of the user book to be deleted
   * @returns The number of deleted reading recordings
   */
  deleteByUserBookId(userBookId: ObjectIdValueObject): Promise<number>;
}
