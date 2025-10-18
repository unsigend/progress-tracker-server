// Book Repository Interface

import { Book } from "@/domain/entities/book.entity";

/**
 * Book Query
 * @param key - The key to filter books by
 * @param value - The value to filter books by
 * @param page - The page number
 * @param limit - The number of results per page
 * @param sort - The field to sort by
 * @param order - The order to sort by
 */
export interface BookQueryInterface {
  key?: string;
  value?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface BookRepositoryInterface {
  /**
   * Create a book
   * @param book - The book to create
   * @returns The created book
   */
  create(book: Book): Promise<Book>;

  /**
   * Find all books
   * @param query - The query
   * @returns The books and the total number of books
   */
  findAll(
    query?: BookQueryInterface,
  ): Promise<{ books: Book[]; totalCount: number }>;

  /**
   * Find a book by id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  findById(id: string): Promise<Book | null>;

  /**
   * Update a book
   * @param book - The book to update
   * @returns The updated book or null if the book is not found
   */
  update(book: Book): Promise<Book | null>;

  /**
   * Delete a book
   * @param id - The id of the book
   * @returns The deleted book or null if the book is not found
   */
  delete(id: string): Promise<Book | null>;
}
