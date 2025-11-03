import { Inject, Injectable } from "@nestjs/common";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Find user book id use case
 * @description Find user book by id use case which is used to find a user book by id.
 */
@Injectable()
export class FindUserBookIdUseCase {
  /**
   * Constructor for FindUserBookIdUseCase
   * @param userBookRepository - The user book repository
   */
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the find user book by id use case
   * @param id - The id of the user book
   * @returns The user book
   */
  public async execute(id: ObjectIdValueObject): Promise<UserBookEntity> {
    // find the user book by id
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(id);
    if (userBook === null) {
      throw new NotFoundException("User book not found");
    }

    // return the user book
    return userBook;
  }
}
