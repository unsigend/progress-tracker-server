// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { UserBookEntity } from "../entities/user-book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";

/**
 * User book repository token
 * @description User book repository token which is used to inject the user book repository.
 */
export const USER_BOOK_REPOSITORY_TOKEN = Symbol("USER_BOOK_REPOSITORY_TOKEN");

/**
 * User book repository interface
 * @description User book repository which is used to store the user book information.
 */
export interface IUserBookRepository extends IBaseRepository<UserBookEntity> {
  /**
   * Find a user book by book id and user id
   * @param bookId - The book id
   * @param userId - The user id
   * @returns The user book or null if not found
   */
  findByBookIdAndUserId(
    bookId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
  ): Promise<UserBookEntity | null>;

  /**
   * Find all user books with book
   * @param query - The query
   * @returns The user books and the total count of the user books
   */
  findAllWithBook(query: QueryBase): Promise<{
    data: Array<{ userBook: UserBookEntity; book: BookEntity }>;
    totalCount: number;
  }>;

  /**
   * Find a user book by id with book
   * @param id - The id of the user book
   * @returns The user book and the book or null if not found
   */
  findByIdWithBook(id: ObjectIdValueObject): Promise<{
    userBook: UserBookEntity;
    book: BookEntity;
  } | null>;
}
