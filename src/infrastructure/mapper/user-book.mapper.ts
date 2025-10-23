// import models
import {
  ReadingStatus as ReadingStatusModel,
  UserBook as UserBookModel,
} from "@prisma/client";

// import entities
import {
  ReadingStatus,
  UserBookEntity,
} from "@/domain/entities/user-book.entity";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";
import { ReadingStatusValueObject } from "@/domain/value-objects/user-book/reading-status.vo";
import { PageValueObject } from "@/domain/value-objects/book/page.vo";

/**
 * User book mapper
 */
export class UserBookMapper {
  /**
   * Map a reading status entity to a reading status model
   * @param readingStatus - The reading status entity to be mapped
   * @returns The reading status model
   */
  private static toReadingStatusModel(
    readingStatus: ReadingStatus,
  ): ReadingStatusModel {
    switch (readingStatus) {
      case ReadingStatus.IN_PROGRESS:
        return ReadingStatusModel.IN_PROGRESS;
      case ReadingStatus.COMPLETED:
        return ReadingStatusModel.COMPLETED;
    }
  }

  /**
   * Map a reading status model to a reading status entity
   * @param readingStatus - The reading status model to be mapped
   * @returns The reading status entity
   */
  private static toReadingStatusEntity(
    readingStatus: ReadingStatusModel,
  ): ReadingStatus {
    switch (readingStatus) {
      case ReadingStatusModel.COMPLETED:
        return ReadingStatus.COMPLETED;
      case ReadingStatusModel.IN_PROGRESS:
        return ReadingStatus.IN_PROGRESS;
    }
  }
  /**
   * Map a user book entity to a user book model
   * @param userBook - The user book entity to be mapped
   * @returns The user book model
   */
  public static toModel(userBook: UserBookEntity): UserBookModel {
    return {
      id: userBook.getId().getValue(),
      user_id: userBook.getUserId().getValue(),
      book_id: userBook.getBookId().getValue(),
      status: this.toReadingStatusModel(userBook.getReadingStatus().getValue()),
      current_page: userBook.getCurrentPage().getValue(),
      start_date: userBook.getStartDate(),
      completed_date: userBook.getCompletedDate(),
      total_minutes: userBook.getTotalMinutes(),
      total_days: userBook.getTotalDays(),
      createdAt: userBook.getCreatedAt(),
      updatedAt: userBook.getUpdatedAt(),
    };
  }

  /**
   * Map a user book model to a user book entity
   * @param userBook - The user book model to be mapped
   * @returns The user book entity
   */
  public static toEntity(userBook: UserBookModel): UserBookEntity {
    return UserBookEntity.reconstitute(
      new ObjectIdValueObject(userBook.id),
      new ObjectIdValueObject(userBook.user_id),
      new ObjectIdValueObject(userBook.book_id),
      new ReadingStatusValueObject(this.toReadingStatusEntity(userBook.status)),
      new PageValueObject(userBook.current_page),
      userBook.start_date,
      userBook.completed_date,
      userBook.total_minutes,
      userBook.total_days,
      userBook.createdAt,
      userBook.updatedAt,
    );
  }
}
