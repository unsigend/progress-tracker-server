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
 * Find book by ISBN 10 use case
 * @description Find book by ISBN 10 use case
 */
@Injectable()
export class FindBookByISBN10UseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find book by ISBN 10 use case
   * @description Execute the find book by ISBN 10 use case
   * @param isbn10 - The ISBN 10 of the book to be found
   * @returns The book entity
   */
  async execute(isbn10: ISBNValueObject): Promise<BookEntity> {
    const book: BookEntity | null =
      await this.bookRepository.findByISBN10(isbn10);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }
}
