// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { BookEntity } from "../entities/book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * Book repository token
 * @description Book repository token which is used to inject the book repository.
 */
export const BOOK_REPOSITORY_TOKEN = Symbol("BOOK_REPOSITORY_TOKEN");

/**
 * Book repository interface
 * @description Book repository which is used to store the book information.
 */
export interface IBookRepository extends IBaseRepository<BookEntity> {
  /**
   * Find a book by ISBN10
   * @param isbn10 - The ISBN10 of the book
   * @returns The book or null if not found
   */
  findByISBN10(isbn10: string): Promise<BookEntity | null>;
  /**
   * Find a book by ISBN13
   * @param isbn13 - The ISBN13 of the book
   * @returns The book or null if not found
   */
  findByISBN13(isbn13: string): Promise<BookEntity | null>;

  /**
   * Find books by created by
   * @param createdById - The id of the user who created the book
   * @returns The books and the total count of the books
   */
  findByCreatedBy(
    createdById: ObjectIdValueObject,
  ): Promise<{ data: BookEntity[]; totalCount: number }>;

  /**
   * Find random books based on the date
   * @param count - The count of the books to find
   * @returns The random books
   */
  findRandom(count: number): Promise<BookEntity[]>;
}
