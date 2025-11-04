import { Injectable } from "@nestjs/common";
import { type IBookRepository } from "@/modules/reading/domain/repositories/book.repository";
import { BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/book.repository";
import { Inject } from "@nestjs/common";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";

/**
 * Find random books use case
 * @description Find random books use case which is used to find random books based on the date.
 */
@Injectable()
export class FindRandomBooksUseCase {
  /**
   * Constructor for FindRandomBooksUseCase
   * @param bookRepository - The book repository
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find random books use case
   * @param count - The count of the books to find
   * @returns The random books
   */
  public async execute(count: number): Promise<BookEntity[]> {
    // find the random books
    const books: BookEntity[] = await this.bookRepository.findRandom(count);

    // return the random books
    return books;
  }
}
