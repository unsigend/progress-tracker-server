/**
 * Book response DTO
 *
 * @remarks This DTO represents a book in API responses
 */
export class BookResponseDto {
  /**
   * The unique identifier of the book
   * @example "cm123456789abcdef"
   */
  id: string;

  /**
   * The title of the book
   * @example "The Great Gatsby"
   */
  title: string;

  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  author: string | null;

  /**
   * The description of the book
   * @example "A classic American novel set in the Jazz Age"
   */
  description: string | null;

  /**
   * The number of pages in the book
   * @example 180
   */
  pages: number | null;

  /**
   * The URL of the book's cover image
   * @example "https://example.com/book-cover.jpg"
   */
  imageURL: string | null;

  /**
   * The ISBN of the book
   * @example "978-0-7432-7356-5"
   */
  ISBN: string | null;

  /**
   * The timestamp when the book was created
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: Date;

  /**
   * The timestamp when the book was last updated
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: Date;
}
