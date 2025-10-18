// User Book Entity

export enum ReadingStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export class UserBook {
  id: string;
  book_id: string;
  user_id: string;
  status: ReadingStatus;
  current_page: number;
  start_date: Date | null;
  completed_date: Date | null;
  total_minutes: number;
  total_days: number;
  createdAt: Date;
  updatedAt: Date;
}
