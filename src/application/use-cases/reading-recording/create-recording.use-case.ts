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

// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";
import { UserBookEntity } from "@domain/entities/user-book.entity";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

/**
 * Create reading recording use case
 * @description Create reading recording use case
 */
@Injectable()
export class CreateReadingRecordingUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the create reading recording use case
   * @description Execute the create reading recording use case
   * @param userBookId - The id of the user book
    @param date - The date of the reading recording
    @param pages - The pages of the reading recording
    @param minutes - The minutes of the reading recording
    @param notes - The notes of the reading recording
    @returns The reading recording entity
   */
  async execute(
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PageValueObject,
    minutes: MinuteValueObject,
    notes?: string | null,
  ): Promise<ReadingRecordingEntity> {
    // check whether the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(userBookId);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // create a new reading recording
    const newReadingRecording: ReadingRecordingEntity =
      ReadingRecordingEntity.create(userBookId, date, pages, minutes, notes);

    // save the reading recording
    await this.readingRecordingRepository.save(newReadingRecording);

    // return the reading recording
    return newReadingRecording;
  }
}
