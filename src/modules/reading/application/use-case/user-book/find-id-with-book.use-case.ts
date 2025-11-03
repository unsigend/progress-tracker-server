import { Injectable } from "@nestjs/common";
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";
import { Inject } from "@nestjs/common";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Find user book id with book use case
 * @description Find user book id with book use case which is used to find a user book by id with book.
 */
@Injectable()
export class FindUserBookIdWithBookUseCase {
  /**
   * Constructor for FindUserBookIdWithBookUseCase
   * @param userBookRepository - The user book repository
   */
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the find user book id with book use case
   * @param id - The id of the user book
   * @returns The user book and the book
   */
  public async execute(
    id: ObjectIdValueObject,
  ): Promise<{ userBook: UserBookEntity; book: BookEntity }> {
    // find the user book by id
    const userBook: { userBook: UserBookEntity; book: BookEntity } | null =
      await this.userBookRepository.findByIdWithBook(id);
    if (userBook === null) {
      throw new NotFoundException("User book not found");
    }

    // return the user book and the book
    return userBook;
  }
}
