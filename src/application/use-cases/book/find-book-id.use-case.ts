// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IBookRepository } from "@domain/repositories/book.repository";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

/**
 * Find book by id use case
 * @description Find book by id use case
 */
@Injectable()
export class FindBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find book by id use case
   * @description Execute the find book by id use case
   * @param id - The id of the book to be found
   * @returns The book entity
   */
  async execute(id: ObjectIdValueObject): Promise<BookEntity> {
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }
}
