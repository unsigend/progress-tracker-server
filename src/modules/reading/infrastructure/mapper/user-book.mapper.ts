// import dependencies
import {
  UserBookEntity,
  ReadingStatus,
} from "@/modules/reading/domain/entities/user-book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import {
  ReadingStatus as ReadingStatusModel,
  UserBook as UserBookModel,
} from "@prisma/client";
import { MinutesValueObject } from "../../domain/object-value/minutes.vo";
import { PagesValueObject } from "../../domain/object-value/pages.vo";
import { UserBookResponseDto } from "../../presentation/dtos/user-book/user-book.response.dto";
import { BookMapper } from "./book.mapper";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
/**
 * User book mapper
 * @description User book mapper which is used to map the user book
 * entity to the user book model and vice versa.
 */
export class UserBookMapper {
  /**
   * Map a reading status entity to a reading status model
   * @param status - The reading status entity to map
   * @returns The reading status model
   */
  private static toModelStatus(status: ReadingStatus): ReadingStatusModel {
    switch (status) {
      case ReadingStatus.IN_PROGRESS:
        return ReadingStatusModel.IN_PROGRESS;
      case ReadingStatus.COMPLETED:
        return ReadingStatusModel.COMPLETED;
      default:
        throw new Error("Invalid reading status");
    }
  }
  /**
   * Map a reading status model to a reading status entity
   * @param status - The reading status model to map
   * @returns The reading status entity
   */
  private static toEntityStatus(status: ReadingStatusModel): ReadingStatus {
    switch (status) {
      case ReadingStatusModel.IN_PROGRESS:
        return ReadingStatus.IN_PROGRESS;
      case ReadingStatusModel.COMPLETED:
        return ReadingStatus.COMPLETED;
    }
  }
  /**
   * Map a user book entity to a user book model
   * @param userBook - The user book entity to map
   * @returns The user book model
   */
  public static toModel(userBook: UserBookEntity): UserBookModel {
    return {
      id: userBook.getId().getId(),
      book_id: userBook.getBookId().getId(),
      user_id: userBook.getUserId().getId(),
      status: this.toModelStatus(userBook.getStatus()),
      current_page: userBook.getCurrentPage().getPages(),
      start_date: userBook.getStartDate() ?? null,
      completed_date: userBook.getCompletedDate() ?? null,
      total_minutes: userBook.getTotalMinutes().getMinutes(),
      total_days: userBook.getTotalDays(),
      createdAt: userBook.getCreatedAt(),
      updatedAt: userBook.getUpdatedAt(),
    };
  }

  /**
   * Map a user book model to a user book entity
   * @param userBookModel - The user book model to map
   * @returns The user book entity
   */
  public static toEntity(userBookModel: UserBookModel): UserBookEntity {
    return UserBookEntity.reconstitute(
      new ObjectIdValueObject(userBookModel.id),
      new ObjectIdValueObject(userBookModel.book_id),
      new ObjectIdValueObject(userBookModel.user_id),
      this.toEntityStatus(userBookModel.status),
      new PagesValueObject(userBookModel.current_page),
      userBookModel.start_date,
      userBookModel.completed_date,
      new MinutesValueObject(userBookModel.total_minutes),
      userBookModel.total_days,
      userBookModel.createdAt,
      userBookModel.updatedAt,
    );
  }

  /**
   * Map a user book entity to a user book response dto
   * @param userBook - The user book entity to map
   * @param book - The book entity to map
   * @returns The user book response dto
   */
  public static toDto(
    userBook: UserBookEntity,
    book?: BookEntity,
  ): UserBookResponseDto {
    return {
      id: userBook.getId().getId(),
      bookId: userBook.getBookId().getId(),
      status: userBook.getStatus(),
      currentPage: userBook.getCurrentPage().getPages(),
      startDate: userBook.getStartDate(),
      completedDate: userBook.getCompletedDate(),
      totalMinutes: userBook.getTotalMinutes().getMinutes(),
      totalDays: userBook.getTotalDays(),
      createdAt: userBook.getCreatedAt(),
      updatedAt: userBook.getUpdatedAt(),
      book: book ? BookMapper.toDto(book) : null,
    };
  }

  /**
   * Map a sort to a sort model
   * @param sort - The sort to map
   * @returns The sort model
   */
  public static toSort(
    sort: "createdAt" | "updatedAt" | "completedDate" | "startDate",
  ): string {
    switch (sort) {
      case "createdAt":
        return "createdAt";
      case "updatedAt":
        return "updatedAt";
      case "completedDate":
        return "completed_date";
      case "startDate":
        return "start_date";
    }
  }
}
