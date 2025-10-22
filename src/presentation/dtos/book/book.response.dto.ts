/**
 * Book response dto
 * @description Book response dto
 */
export class BookResponseDto {
  /** The id of the book */
  id: string;

  /** The title of the book */
  title: string;

  /** The pages of the book */
  pages: number;

  /** The author of the book */
  author: string | null;

  /** The description of the book */
  description: string | null;

  /** The ISBN 10 of the book */
  isbn10: string | null;

  /** The ISBN 13 of the book */
  isbn13: string | null;

  /** The cover url of the book */
  coverUrl: string | null;

  /** The created by id of the book */
  createdById: string;

  /** The created at timestamp */
  createdAt: Date;

  /** The updated at timestamp */
  updatedAt: Date;
}
