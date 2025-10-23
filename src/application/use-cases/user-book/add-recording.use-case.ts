// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IUserBookRepository } from "@domain/repositories/user-book.repository";
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";
import type { IBookRepository } from "@domain/repositories/book.repository";

// import tokens
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

// import entities
import { ReadingRecordingQuery } from "@domain/repositories/queries/reading-recording.query";
import { UserBookEntity } from "@domain/entities/user-book.entity";
import { BookEntity } from "@domain/entities/book.entity";
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";

/**
 * Add recording use case
 * @description Add recording use case
 */
@Injectable()
export class AddRecordingUseCase {
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the add recording use case
   * @description Execute the add recording use case
   * @param userBookId - The id of the user book
   * @param recording - The recording to be added
   * @returns void
   */
  async execute(
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PageValueObject,
    minutes: MinuteValueObject,
    notes?: string | null,
  ): Promise<void> {
    // check whether the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(userBookId);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // get the book
    const book: BookEntity | null = await this.bookRepository.findById(
      userBook.getBookId(),
    );
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    // check if the recording already exists for the same date
    const { readingRecordings: existingRecordings, totalCount } =
      await this.readingRecordingRepository.findAll(
        new ReadingRecordingQuery(userBookId, date),
      );

    let isNewDay: boolean = true;
    let savedRecording: ReadingRecordingEntity | null = null;
    const newRecording: ReadingRecordingEntity = ReadingRecordingEntity.create(
      userBookId,
      date,
      pages,
      minutes,
      notes,
    );

    // if the recording already exists, merge it with the existing recording
    if (totalCount === 1) {
      isNewDay = false;
      savedRecording = existingRecordings[0];

      // merge the new recording with the existing recording
      savedRecording.merge(newRecording);
    } else {
      isNewDay = true;
      savedRecording = newRecording;
    }

    // add the recording to the user book
    userBook.addRecording(date, pages, minutes, isNewDay);

    // check if the user book is completed
    if (userBook.isCompleted(book.getPages())) {
      userBook.markAsCompleted(date);
    }

    // save data in repositories
    await this.userBookRepository.save(userBook);
    await this.readingRecordingRepository.save(savedRecording);
  }
}
