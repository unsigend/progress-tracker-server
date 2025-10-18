// Book Entity

export class Book {
  id: string;
  title: string;
  author?: string | null;
  description?: string | null;
  ISBN10?: string | null;
  ISBN13?: string | null;
  pages: number;
  cover_url?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}
