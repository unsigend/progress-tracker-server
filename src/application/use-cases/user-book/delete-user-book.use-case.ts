// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";

// import interfaces
import type { IUserBookRepository } from "@domain/repositories/user-book.repository";

// import tokens
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

/**
 * Delete user book use case
 * @description Delete user book use case
 */
@Injectable()
export class DeleteUserBookUseCase {
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the delete user book use case
   * @description Execute the delete user book use case
   * @param id - The id of the user book to be deleted
   * @returns void
   */
  async execute(id: ObjectIdValueObject): Promise<void> {
    // check whether the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(id);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // delete the user book
    userBook.delete();

    // delete the user book in repository
    await this.userBookRepository.delete(id);
  }
}
