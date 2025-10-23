// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import entities
import { BookEntity } from "@domain/entities/book.entity";
import { UserBookEntity } from "@domain/entities/user-book.entity";

// import interfaces
import type { IUserBookRepository } from "@domain/repositories/user-book.repository";
import type { IBookRepository } from "@domain/repositories/book.repository";

// import tokens
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { ReadingStatusValueObject } from "@domain/value-objects/user-book/reading-status.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";

// import enums
import { ReadingStatus } from "@domain/entities/user-book.entity";

/**
 * Create user book use case
 * @description Create user book use case
 */
@Injectable()
export class CreateUserBookUseCase {
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the create user book use case
   * @description Execute the create user book use case
   * @param userId - The id of the user
   * @param bookId - The id of the book
   * @returns The user book entity
   */
  async execute(
    userId: ObjectIdValueObject,
    bookId: ObjectIdValueObject,
  ): Promise<UserBookEntity> {
    // check whether the book exists
    const book: BookEntity | null = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    // create a new user book
    const newUserBook: UserBookEntity = UserBookEntity.create(
      userId,
      bookId,
      new ReadingStatusValueObject(ReadingStatus.IN_PROGRESS),
      new PageValueObject(0),
      null,
      null,
      0,
      0,
    );

    // save the user book
    await this.userBookRepository.save(newUserBook);

    // return the user book
    return newUserBook;
  }
}
