/**
 * Course recording response DTO
 * @description Course recording response DTO which is used to return the course recording information.
 */
export class CourseRecordingResponseDto {
  /** The id of the course recording */
  id: string;

  /** The user course id of the course recording */
  userCourseId: string;

  /** The date of the course recording */
  date: Date;

  /** The minutes of the course recording */
  minutes: number;

  /** The record type of the course recording */
  recordType: string;

  /** The notes of the course recording */
  notes: string | null;
}
