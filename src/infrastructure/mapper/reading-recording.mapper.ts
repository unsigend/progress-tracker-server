// import models
import { ReadingRecord as ReadingRecordModel } from "@prisma/client";

// import entities
import { ReadingRecordingEntity } from "@/domain/entities/reading-recording.entity";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@/domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@/domain/value-objects/reading-recording/minute.vo";

/**
 * Reading recording mapper
 * @description Reading recording mapper
 */
export class ReadingRecordingMapper {
  /**
   * Map a reading recording entity to a reading recording model
   * @param readingRecording - The reading recording entity to be mapped
   * @returns The reading recording model
   */
  public static toModel(
    readingRecording: ReadingRecordingEntity,
  ): ReadingRecordModel {
    return {
      id: readingRecording.getId().getValue(),
      user_book_id: readingRecording.getUserBookId().getValue(),
      date: readingRecording.getDate(),
      pages: readingRecording.getPages().getValue(),
      minutes: readingRecording.getMinutes().getValue(),
      notes: readingRecording.getNotes(),
    };
  }

  /**
   * Map a reading recording model to a reading recording entity
   * @param readingRecording - The reading recording model to be mapped
   * @returns The reading recording entity
   */
  public static toEntity(
    readingRecording: ReadingRecordModel,
  ): ReadingRecordingEntity {
    return ReadingRecordingEntity.reconstitute(
      new ObjectIdValueObject(readingRecording.id),
      new ObjectIdValueObject(readingRecording.user_book_id),
      readingRecording.date,
      new PageValueObject(readingRecording.pages),
      new MinuteValueObject(readingRecording.minutes),
      readingRecording.notes,
    );
  }
}
