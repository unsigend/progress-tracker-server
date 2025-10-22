// import entities
import { BookEntity } from "@domain/entities/book.entity";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { ISBNValueObject } from "@domain/value-objects/book/isbn.vo";

// import queries
import { BookQuery } from "@domain/repositories/queries/book.query";

/**
 * Book repository token
 * @description Book repository token
 */
export const BOOK_REPOSITORY_TOKEN = Symbol("BOOK_REPOSITORY_TOKEN");

/**
 * Book repository interface
 * @description Book repository interface
 */
export interface IBookRepository {
  /**
   * Save a book updates or creates a new book
   * @description Save a book
   * @param book - The book to be saved
   */
  save(book: BookEntity): Promise<void>;

  /**
   * Find a book by id
   * @description Find a book by id
   * @param id - The id of the book to be found
   * @returns The book or null if not found
   */
  findById(id: ObjectIdValueObject): Promise<BookEntity | null>;

  /**
   * Find books by created by id
   * @description Find books by created by id
   * @param createdById - The id of the user who created the books
   * @returns The books and total count
   */
  findByCreatedById(
    createdById: ObjectIdValueObject,
  ): Promise<{ books: BookEntity[]; totalCount: number }>;

  /**
   * Find a book by ISBN 10
   * @description Find a book by ISBN 10
   * @param isbn10 - The ISBN 10 of the books to be found
   * @returns The book or null if not found
   */
  findByISBN10(isbn10: ISBNValueObject): Promise<BookEntity | null>;

  /**
   * Find a book by ISBN 13
   * @description Find a book by ISBN 13
   * @param isbn13 - The ISBN 13 of the books to be found
   * @returns The book or null if not found
   */
  findByISBN13(isbn13: ISBNValueObject): Promise<BookEntity | null>;

  /**
   * Find all books
   * @description Find all books
   * @param query - The query to be used to find the books
   * @returns All books and total count
   */
  findAll(
    query: BookQuery,
  ): Promise<{ books: BookEntity[]; totalCount: number }>;

  /**
   * Delete a book
   * @description Delete a book
   * @param id - The id of the book to be deleted
   */
  delete(id: ObjectIdValueObject): Promise<void>;
}
