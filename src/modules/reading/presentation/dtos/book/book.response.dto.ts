/**
 * Book response DTO
 * @description Book response DTO which is used to return the book information.
 */
export class BookResponseDto {
  /** The id of the book */
  id: string;

  /** The title of the book */
  title: string;

  /** The author of the book */
  author: string | null;

  /** The description of the book */
  description: string | null;

  /** The ISBN10 of the book */
  ISBN10: string | null;

  /** The ISBN13 of the book */
  ISBN13: string | null;

  /** The cover URL of the book */
  coverUrl: string | null;

  /** The created at of the book */
  createdAt: Date;

  /** The updated at of the book */
  updatedAt: Date;

  /** The created by of the book */
  createdBy: string;
}
