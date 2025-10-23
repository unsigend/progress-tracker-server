/**
 * Reading recording response dto
 * @description Reading recording response dto
 */
export class ReadingRecordingResponseDto {
  /** The id of the reading recording */
  id: string;

  /** The user book id of the reading recording */
  userBookId: string;

  /** The date of the reading recording */
  date: Date;

  /** The pages of the reading recording */
  pages: number;

  /** The minutes of the reading recording */
  minutes: number;

  /** The notes of the reading recording */
  notes: string | null;
}
