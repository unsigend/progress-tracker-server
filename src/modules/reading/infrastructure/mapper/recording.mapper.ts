// import dependencies
import { RecordingEntity } from "@/modules/reading/domain/entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { ReadingRecord as ReadingRecordModel } from "@prisma/client";
import { PagesValueObject } from "../../domain/object-value/pages.vo";
import { MinutesValueObject } from "../../domain/object-value/minutes.vo";
import { BookRecordingResponseDto } from "../../presentation/dtos/recordings/recording.response.dto";

/**
 * Book recording mapper
 * @description Book recording mapper which is used to map the book recording entity to the book recording model and vice versa.
 */
export class BookRecordingMapper {
  /**
   * Map a recording entity to a reading record model
   * @param recording - The book recording entity to map
   * @returns The book recording model
   */
  public static toModel(recording: RecordingEntity): ReadingRecordModel {
    return {
      id: recording.getId().getId(),
      userBookId: recording.getUserBookId().getId(),
      date: recording.getDate(),
      pages: recording.getPages().getPages(),
      minutes: recording.getMinutes().getMinutes(),
      notes: recording.getNotes(),
    };
  }

  /**
   * Map a recording model to a recording entity
   * @param recordingModel - The recording model to map
   * @returns The recording entity
   */
  public static toEntity(recordingModel: ReadingRecordModel): RecordingEntity {
    return RecordingEntity.reconstitute(
      new ObjectIdValueObject(recordingModel.id),
      new ObjectIdValueObject(recordingModel.userBookId),
      recordingModel.date,
      new PagesValueObject(recordingModel.pages),
      new MinutesValueObject(recordingModel.minutes),
      recordingModel.notes,
    );
  }

  /**
   * Map a recording entity to a recording response dto
   * @param recording - The recording entity to map
   * @returns The recording response dto
   */
  public static toDto(recording: RecordingEntity): BookRecordingResponseDto {
    return {
      id: recording.getId().getId(),
      userBookId: recording.getUserBookId().getId(),
      date: recording.getDate(),
      pages: recording.getPages().getPages(),
      minutes: recording.getMinutes().getMinutes(),
      notes: recording.getNotes(),
    };
  }
}
