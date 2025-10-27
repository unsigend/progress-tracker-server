// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { Inject } from "@nestjs/common";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Find book by id use case
 * @description Find book by id use case which is used to find a book by id.
 */
export class FindBookIdUseCase {
  /**
   * Constructor for FindBookIdUseCase
   * @param bookRepository - The book repository
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find book by id use case
   * @param id - The id of the book
   * @returns The book
   */
  public async execute(id: ObjectIdValueObject): Promise<BookEntity> {
    // check if the book exists
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (book === null) {
      throw new NotFoundException("Book not found");
    }

    // return the book
    return book;
  }
}
