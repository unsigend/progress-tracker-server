// import dependencies
import { Injectable } from "@nestjs/common";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

// import dtos
import { BookResponseDto } from "@/presentation/dtos/book/book.response.dto";

/**
 * Book mapper
 * @description Book mapper
 */
@Injectable()
export class BookMapper {
  /**
   * Map a book entity to a book response dto
   * @param book - The book entity to be mapped
   * @returns The book response dto
   */
  public static toResponseDto(book: BookEntity): BookResponseDto {
    return {
      id: book.getId().getValue(),
      title: book.getTitle(),
      author: book.getAuthor(),
      pages: book.getPages()!.getValue(),
      description: book.getDescription(),
      isbn10: book.getISBN10()?.getValue() ?? null,
      isbn13: book.getISBN13()?.getValue() ?? null,
      coverUrl: book.getCoverUrl()?.getValue() ?? null,
      createdById: book.getCreatedById().getValue(),
      createdAt: book.getCreatedAt()!,
      updatedAt: book.getUpdatedAt()!,
    };
  }
}
