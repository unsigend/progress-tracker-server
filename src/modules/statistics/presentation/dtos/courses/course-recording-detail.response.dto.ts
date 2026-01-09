/**
 * Course recording detail response DTO
 * @description Course recording detail response DTO which is used to return the course recording detail statistics.
 */
export class CourseRecordingDetailResponseDto {
  /** The total minutes of all course recordings */
  totalMinutes: number;

  /** The minutes grouped by record type (e.g., { LECTURE: 874, LAB: 1100 }) */
  minutesByType: Record<string, number>;
}
