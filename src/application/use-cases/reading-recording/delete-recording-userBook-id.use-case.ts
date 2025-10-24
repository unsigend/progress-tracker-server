// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";
import type { IUserBookRepository } from "@domain/repositories/user-book.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";

/**
 * Delete reading recordings by user book id use case
 * @description Delete reading recordings by user book id use case
 */
@Injectable()
export class DeleteReadingRecordingUserBookIdUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the delete reading recordings by user book id use case
   * @description Execute the delete reading recordings by user book id use case
   * @param userBookId - The id of the user book to be deleted
   * @returns The number of deleted reading recordings
   */
  async execute(userBookId: ObjectIdValueObject): Promise<number> {
    // check whether the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(userBookId);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // delete the reading recordings by user book id
    const deletedCount =
      await this.readingRecordingRepository.deleteByUserBookId(userBookId);
    return deletedCount;
  }
}
