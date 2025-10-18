// Reading Record Entity

export class ReadingRecord {
  id: string;
  user_book_id: string;
  date: Date;
  pages: number;
  minutes: number;
  notes?: string | null;
}
