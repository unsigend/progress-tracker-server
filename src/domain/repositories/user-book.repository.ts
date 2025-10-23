// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";

// import queries
import { UserBookQuery } from "@domain/repositories/queries/user-book.query";

/**
 * User book repository token
 * @description User book repository token
 */
export const USER_BOOK_REPOSITORY_TOKEN = Symbol("USER_BOOK_REPOSITORY_TOKEN");

/**
 * User book repository interface
 * @description User book repository interface
 */
export interface IUserBookRepository {
  /**
   * Save a user book updates or creates a new user book
   * @description Save a user book
   * @param userBook - The user book to be saved
   */
  save(userBook: UserBookEntity): Promise<void>;

  /**
   * Find a user book by id
   * @description Find a user book by id
   * @param id - The id of the user book to be found
   * @returns The user book or null if not found
   */
  findById(id: ObjectIdValueObject): Promise<UserBookEntity | null>;

  /**
   * Find all user books
   * @description Find all user books
   * @param query - The query to be used to find the user books
   * @returns The user books and total count
   */
  findAll(
    query: UserBookQuery,
  ): Promise<{ userBooks: UserBookEntity[]; totalCount: number }>;

  /**
   * Delete a user book
   * @description Delete a user book
   * @param id - The id of the user book to be deleted
   */
  delete(id: ObjectIdValueObject): Promise<void>;
}
