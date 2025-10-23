// import dependencies
import { Injectable } from "@nestjs/common";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";

// import dto
import { UserBookResponseDto } from "@presentation/dtos/user-book/user-book.response.dto";

/**
 * User book mapper
 * @description User book mapper
 */
@Injectable()
export class UserBookMapper {
  /**
   * Map a user book entity to a user book response dto
   * @param userBook - The user book entity to be mapped
   * @returns The user book response dto
   */
  public static toResponseDto(userBook: UserBookEntity): UserBookResponseDto {
    return {
      id: userBook.getId().getValue(),
      userId: userBook.getUserId().getValue(),
      bookId: userBook.getBookId().getValue(),
      readingStatus: userBook.getReadingStatus().getValue(),
      currentPage: userBook.getCurrentPage().getValue(),
      startDate: userBook.getStartDate(),
      completedDate: userBook.getCompletedDate(),
      totalMinutes: userBook.getTotalMinutes(),
      totalDays: userBook.getTotalDays(),
      createdAt: userBook.getCreatedAt(),
      updatedAt: userBook.getUpdatedAt(),
    };
  }
}
