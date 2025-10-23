// import dependencies
import { Injectable } from "@nestjs/common";

// import dtos
import { ReadingRecordingResponseDto } from "@/presentation/dtos/reading-recording/reading-recording.response.dto";

// import entities
import { ReadingRecordingEntity } from "@/domain/entities/reading-recording.entity";

/**
 * Reading recording mapper
 * @description Reading recording mapper
 */
@Injectable()
export class ReadingRecordingMapper {
  /**
   * Map a reading recording entity to a reading recording response dto
   * @param readingRecording - The reading recording entity to be mapped
   * @returns The reading recording response dto
   */
  public static toResponseDto(
    readingRecording: ReadingRecordingEntity,
  ): ReadingRecordingResponseDto {
    return {
      id: readingRecording.getId().getValue(),
      userBookId: readingRecording.getUserBookId().getValue(),
      date: readingRecording.getDate(),
      pages: readingRecording.getPages().getValue(),
      minutes: readingRecording.getMinutes().getValue(),
      notes: readingRecording.getNotes(),
    };
  }
}
