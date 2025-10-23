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
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";
import { UserBookEntity } from "@domain/entities/user-book.entity";
import { ReadingRecordingQuery } from "@domain/repositories/queries/reading-recording.query";

/**
 * Find reading recording by user book id use case
 * @description Find reading recording by user book id use case
 */
@Injectable()
export class FindReadingRecordingByUserBookIdUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the find reading recording by user book id use case
   * @description Execute the find reading recording by user book id use case
   * @param userBookId - The id of the user book to be found
    @returns The reading recordings and total count
   */
  async execute(userBookId: ObjectIdValueObject): Promise<{
    readingRecordings: ReadingRecordingEntity[];
    totalCount: number;
  }> {
    // check whether the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(userBookId);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // create the query
    const query: ReadingRecordingQuery = new ReadingRecordingQuery(userBookId);

    // find the reading recordings by user book id
    const { readingRecordings, totalCount } =
      await this.readingRecordingRepository.findAll(query);
    return { readingRecordings, totalCount };
  }
}
