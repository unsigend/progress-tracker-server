// User Book Repository Interface

import { ReadingStatus, UserBook } from "@/domain/entities/user-book.entity";

/**
 * User Book Query
 * @param userId - The id of the user
 * @param bookId - The id of the book
 * @param status - The status of the user book
 * @param page - The page number
 * @param limit - The number of results per page
 * @param sort - The field to sort by
 * @param order - The order to sort by
 */
export interface UserBookQueryInterface {
  userId?: string;
  bookId?: string;
  status?: ReadingStatus;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface UserBookRepositoryInterface {
  /**
   * Create a user book
   * @param userBook - The user book to create
   * @returns The created user book
   */
  create(userBook: UserBook): Promise<UserBook>;

  /**
   * Find all user books
   * @param query - The query
   * @returns The user books and the total number of user books
   */
  findAll(
    query?: UserBookQueryInterface,
  ): Promise<{ userBooks: UserBook[]; totalCount: number }>;

  /**
   * Find a user book by id
   * @param id - The id of the user book
   * @returns The user book or null if the user book is not found
   */
  findById(id: string): Promise<UserBook | null>;

  /**
   * Update a user book
   * @param userBook - The user book to update
   * @returns The updated user book or null if the user book is not found
   */
  update(userBook: UserBook): Promise<UserBook | null>;

  /**
   * Delete a user book
   * @param id - The id of the user book
   * @returns The deleted user book or null if the user book is not found
   */
  delete(id: string): Promise<UserBook | null>;
}
