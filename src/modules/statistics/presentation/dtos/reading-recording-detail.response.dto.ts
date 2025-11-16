// import dependencies
import { BookRecordingResponseDto } from "@/modules/reading/presentation/dtos/recordings/recording.response.dto";

/**
 * Reading recording detail response DTO
 * @description Reading recording detail response DTO
 * which is used to return the reading recording detail information.
 */
export class ReadingRecordingDetailResponseDto {
  /** The recordings of the reading recording detail */
  recordings: BookRecordingResponseDto[];

  /** The total count of the recordings */
  totalCount: number;
}
