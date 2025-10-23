// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IUserBookRepository } from "@domain/repositories/user-book.repository";

// import tokens
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";

/**
 * Find user book by id use case
 * @description Find user book by id use case
 */
@Injectable()
export class FindUserBookByIdUseCase {
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the find user book by id use case
   * @description Execute the find user book by id use case
   * @param id - The id of the user book to be found
   * @returns The user book entity
   */
  async execute(id: ObjectIdValueObject): Promise<UserBookEntity> {
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(id);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }
    return userBook;
  }
}
