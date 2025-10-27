// import dependencies
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Inject, Injectable } from "@nestjs/common";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";

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
    // delete the user book
    return await this.userBookRepository.delete(id);
  }
}
