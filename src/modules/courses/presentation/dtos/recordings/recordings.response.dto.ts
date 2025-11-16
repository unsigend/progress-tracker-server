import { CourseRecordingResponseDto } from "./recording.response.dto";

/**
 * Course recordings response DTO
 * @description Course recordings response DTO which is used to return the course recordings information.
 */
export class CourseRecordingsResponseDto {
  /** The course recordings of the course recordings */
  recordings: CourseRecordingResponseDto[];

  /** The total count of the recordings */
  totalCount: number;
}
