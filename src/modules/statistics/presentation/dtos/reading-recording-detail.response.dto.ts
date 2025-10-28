// import dependencies
import { RecordingResponseDto } from "@/modules/reading/presentation/dtos/recording/recording.response.dto";

/**
 * Reading recording detail response DTO
 * @description Reading recording detail response DTO
 * which is used to return the reading recording detail information.
 */
export class ReadingRecordingDetailResponseDto {
  /** The recordings of the reading recording detail */
  recordings: RecordingResponseDto[];

  /** The total count of the recordings */
  totalCount: number;
}
