/**
 * Daily record response DTO
 * @description Daily record response DTO which is used to return the daily record information.
 */
export interface DailyRecordResponseDto {
  /** The date of the daily record */
  date: string;

  /** The total minutes for this day */
  total: number;

  /** Dynamic record type properties - each record type (LECTURE, LAB, etc.) maps to its minutes and notes */
  [recordType: string]:
    | string
    | number
    | { minutes: number; notes: string | null }
    | null;
}
