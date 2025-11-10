import { BookRecordingResponseDto } from "./recording.response.dto";

/**
 * Book recordings response dto
 * @description Book recordings response dto which is used to return the book recordings information.
 */
export class BookRecordingsResponseDto {
  /** The book recordings of the book recordings */
  recordings: BookRecordingResponseDto[];

  /** The total count of the recordings */
  totalCount: number;
}
