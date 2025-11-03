import { RecordingResponseDto } from "./recording.response.dto";

/**
 * Recordings response dto
 * @description Recordings response dto which is used to return the recordings information.
 */
export class RecordingsResponseDto {
  /** The recordings of the recordings */
  recordings: RecordingResponseDto[];

  /** The total count of the recordings */
  totalCount: number;
}
