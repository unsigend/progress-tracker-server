// import dependencies
import { Inject, Injectable } from "@nestjs/common";
import {
  RECORDING_REPOSITORY_TOKEN,
  type IRecordingRepository,
} from "@/modules/reading/domain/repositories/recording.repository";
import { RecordingEntity } from "../../../domain/entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { PagesValueObject } from "@/modules/reading/domain/object-value/pages.vo";
import { MinutesValueObject } from "@/modules/reading/domain/object-value/minutes.vo";
import {
  USER_BOOK_REPOSITORY_TOKEN,
  type IUserBookRepository,
} from "@/modules/reading/domain/repositories/user-book.repository";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { FilterLogic, FilterOperator } from "@/shared/domain/queries/filter";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { ConflictException } from "@/shared/domain/exceptions/conflict.exception";

/**
 * Create a recording
 * @description Create a recording which is used to create a recording.
 */
@Injectable()
export class CreateRecordingUseCase {
  constructor(
    @Inject(RECORDING_REPOSITORY_TOKEN)
    private readonly recordingRepository: IRecordingRepository,
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the create recording use case
   * @param userBookId - The user book id
   * @param date - The date
   * @param pages - The pages
   * @param minutes - The minutes
   * @param notes - The notes
   * @returns The recording entity
   */
  public async execute(
    userBookId: ObjectIdValueObject,
    date: Date,
    pages: PagesValueObject,
    minutes: MinutesValueObject,
    notes: string | null,
  ): Promise<RecordingEntity> {
    // get the user book
    const userBook = await this.userBookRepository.findById(userBookId);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // get the book
    const book = await this.bookRepository.findById(userBook.getBookId());
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    if (userBook.isCompleted()) {
      throw new ConflictException("User book is already completed");
    }

    // get the left page of the book
    const pageleft: number =
      book.getPages().getPages() - userBook.getCurrentPage().getPages();
    const actualPage: number =
      pages.getPages() > pageleft ? pageleft : pages.getPages();

    // build the recording entity
    const recordingEntity: RecordingEntity = RecordingEntity.create(
      userBookId,
      date,
      new PagesValueObject(actualPage),
      minutes,
      notes,
    );

    // build the query
    const query: QueryBase = new QueryBase(
      [
        {
          field: "user_book_id",
          operator: FilterOperator.EQUALS,
          value: userBookId.getId(),
        },
        {
          field: "date",
          operator: FilterOperator.EQUALS,
          value: date,
        },
      ],
      FilterLogic.AND,
      1,
      1,
      "date",
      "desc",
    );

    // check if the recording already exists on that date
    const { data, totalCount } = await this.recordingRepository.findAll(query);
    let isNewDay = false;

    // if the recording already exists on that date merge it
    if (totalCount > 0) {
      data[0].merge(recordingEntity);
      await this.recordingRepository.save(data[0]);
    } else {
      isNewDay = true;
      await this.recordingRepository.save(recordingEntity);
    }

    // update the user book data
    userBook.addRecording(
      date,
      new PagesValueObject(actualPage),
      minutes,
      isNewDay,
    );

    // check if the book is completed
    if (userBook.getCurrentPage().getPages() >= book.getPages().getPages()) {
      userBook.markAsCompleted(date);
    }

    // save the user book
    await this.userBookRepository.save(userBook);

    // return the recording entity
    return recordingEntity;
  }
}
