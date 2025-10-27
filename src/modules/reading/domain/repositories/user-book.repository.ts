// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { UserBookEntity } from "../entities/user-book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

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
}
