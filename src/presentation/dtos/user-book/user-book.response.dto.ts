/**
 * User book response dto
 * @description User book response dto
 */
export class UserBookResponseDto {
  /** The id of the user book */
  id: string;

  /** The user id of the user book */
  userId: string;

  /** The book id of the user book */
  bookId: string;

  /** The reading status of the user book */
  status: string;

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

  /** The created at timestamp */
  createdAt: Date;

  /** The updated at timestamp */
  updatedAt: Date;
}
