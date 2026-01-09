/**
 * Reading recording response DTO
 * @description Reading recording response DTO which is used to return the reading recording information.
 */
export class ReadingRecordingResponseDto {
  /** The total minutes of the reading recording */
  totalMinutes: number;

  /** The total pages of the reading recording */
  totalPages: number;

  /** The total recordings of the reading recording */
  totalRecordings: number;
}
