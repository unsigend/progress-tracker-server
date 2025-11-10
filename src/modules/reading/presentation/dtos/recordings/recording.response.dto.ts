/**
 * Book recording response dto
 * @description Recording response dto which is used to return the recording information.
 */
export class BookRecordingResponseDto {
  /** The id of the recording */
  id: string;

  /** The user book id of the recording */
  userBookId: string;

  /** The date of the recording */
  date: Date;

  /** The pages of the recording */
  pages: number;

  /** The minutes of the recording */
  minutes: number;

  /** The notes of the recording */
  notes: string | null;
}
