import { DailyRecordResponseDto } from "./daily-record.response.dto";

/**
 * Daily records response DTO
 * @description Daily records response DTO which is used to return the daily records information.
 */
export class DailyRecordsResponseDto {
  /** The daily records */
  dailyRecords: DailyRecordResponseDto[];

  /** The total count of distinct days */
  totalDays: number;

  /** The current page number */
  page: number;

  /** The page size (number of days per page) */
  pageSize: number;
}
