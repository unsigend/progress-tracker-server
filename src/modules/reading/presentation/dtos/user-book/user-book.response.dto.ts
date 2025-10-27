import { ReadingStatus } from "@/modules/reading/domain/entities/user-book.entity";

/**
 * User book response dto
 * @description User book response dto which is used to return the user book information.
 */
export class UserBookResponseDto {
  /** The id of the user book */
  id: string;

  /** The book id of the user book */
  bookId: string;

  /** The status of the user book */
  status: ReadingStatus;

  /** The current page of the user book */
  currentPage: number;

  /** The start date of the user book */
  startDate: Date | null;

  /** The completed date of the user book */
  completedDate: Date | null;

  /** The total minutes of the user book */
  totalMinutes: number;

  /** The total days of the user book */
  totalDays: number;

  /** The created at of the user book */
  createdAt: Date;

  /** The updated at of the user book */
  updatedAt: Date;
}
