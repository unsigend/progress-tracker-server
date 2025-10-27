// import dependencies
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Inject, Injectable } from "@nestjs/common";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Delete user book use case
 * @description Delete user book use case which is used to delete a user book.
 */
@Injectable()
export class DeleteUserBookUseCase {
  /**
   * Constructor for DeleteUserBookUseCase
   * @param userBookRepository - The user book repository
   */
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the delete user book use case
   * @param id - The id of the user book
   * @returns True if the user book was deleted, false otherwise
   */
  public async execute(id: ObjectIdValueObject): Promise<boolean> {
    // check if the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(id);
    if (userBook === null) {
      throw new NotFoundException("User book not found");
    }

    // delete the user book
    return await this.userBookRepository.delete(id);
  }
}
