// import dependencies
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";

/**
 * Create user book use case
 * @description Create user book use case which is used to create a user book.
 */
@Injectable()
export class CreateUserBookUseCase {
  /**
   * Constructor for CreateUserBookUseCase
   * @param userBookRepository - The user book repository
   */
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the create user book use case
   * @param bookId - The book id
   * @param userId - The user id
   * @returns The created user book
   */
  public async execute(
    bookId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
  ): Promise<UserBookEntity> {
    // check if the user book already exists
    const existingUserBook: UserBookEntity | null =
      await this.userBookRepository.findByBookIdAndUserId(bookId, userId);
    if (existingUserBook) {
      throw new ConflictException("User book already exists");
    }

    // create the user book entity
    const userBookEntity: UserBookEntity = UserBookEntity.create(
      bookId,
      userId,
    );

    // save the user book entity
    await this.userBookRepository.save(userBookEntity);

    // return the user book entity
    return userBookEntity;
  }
}
