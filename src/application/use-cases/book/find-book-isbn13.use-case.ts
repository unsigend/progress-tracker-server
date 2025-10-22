// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IBookRepository } from "@domain/repositories/book.repository";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";

// import value objects
import { ISBNValueObject } from "@domain/value-objects/book/isbn.vo";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

/**
 * Find book by ISBN 13 use case
 * @description Find book by ISBN 13 use case
 */
@Injectable()
export class FindBookByISBN13UseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find book by ISBN 13 use case
   * @description Execute the find book by ISBN 13 use case
   * @param isbn13 - The ISBN 13 of the book to be found
   * @returns The book entity
   */
  async execute(isbn13: ISBNValueObject): Promise<BookEntity> {
    const book: BookEntity | null =
      await this.bookRepository.findByISBN13(isbn13);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }
}
