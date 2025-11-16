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
      bookId: userBook.getBookId().getId(),
      userId: userBook.getUserId().getId(),
      status: this.toModelStatus(userBook.getStatus()),
      currentPage: userBook.getCurrentPage().getPages(),
      startDate: userBook.getStartDate() ?? null,
      completedDate: userBook.getCompletedDate() ?? null,
      totalMinutes: userBook.getTotalMinutes().getMinutes(),
      totalDays: userBook.getTotalDays(),
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
      new ObjectIdValueObject(userBookModel.bookId),
      new ObjectIdValueObject(userBookModel.userId),
      this.toEntityStatus(userBookModel.status),
      new PagesValueObject(userBookModel.currentPage),
      userBookModel.startDate,
      userBookModel.completedDate,
      new MinutesValueObject(userBookModel.totalMinutes),
      userBookModel.totalDays,
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
        return "completedDate";
      case "startDate":
        return "startDate";
    }
  }
}
