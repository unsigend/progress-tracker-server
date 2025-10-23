// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IUserBookRepository } from "@domain/repositories/user-book.repository";
import type { IBookRepository } from "@domain/repositories/book.repository";

// import tokens
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";

// import queries
import { UserBookQuery } from "@domain/repositories/queries/user-book.query";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";
import { BookEntity } from "@domain/entities/book.entity";

/**
 * Find all user book use case
 * @description Find all user book use case
 */
@Injectable()
export class FindAllUserBookUseCase {
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find all user book use case
   * @description Execute the find all user book use case
   * @param query - The query to be used to find the user books
   * @returns The user books and total count
   */
  async execute(
    query: UserBookQuery,
  ): Promise<{ userBooks: UserBookEntity[]; totalCount: number }> {
    if (query.getBookId()) {
      // check whether the book exists
      const book: BookEntity | null = await this.bookRepository.findById(
        query.getBookId()!,
      );
      if (!book) {
        throw new NotFoundException("Book not found");
      }
    }

    // find all user books
    const { userBooks, totalCount } =
      await this.userBookRepository.findAll(query);
    return { userBooks, totalCount };
  }
}
