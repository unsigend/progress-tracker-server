// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IBookRepository } from "@domain/repositories/book.repository";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";

// import entities
import { BookEntity } from "@domain/entities/book.entity";
import { BookQuery } from "@domain/repositories/queries/book.query";

/**
 * Find all books use case
 * @description Find all books use case
 */
@Injectable()
export class FindAllBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find all books use case
   * @description Execute the find all books use case
   * @param query - The query to be used to find the books
   * @returns The books and total count
   */
  async execute(
    query: BookQuery,
  ): Promise<{ books: BookEntity[]; totalCount: number }> {
    const { books, totalCount } = await this.bookRepository.findAll(query);
    return { books, totalCount };
  }
}
