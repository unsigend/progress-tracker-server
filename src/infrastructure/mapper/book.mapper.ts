// import models
import { Book as BookModel } from "@prisma/client";

// import entities
import { BookEntity } from "@/domain/entities/book.entity";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";
import { ISBNValueObject } from "@/domain/value-objects/book/isbn.vo";
import { UrlValueObject } from "@/domain/value-objects/common/url.vo";
import { PageValueObject } from "@/domain/value-objects/book/page.vo";

/**
 * Book mapper
 * @description Book mapper
 */
export class BookMapper {
  /**
   * Map a book entity to a book model
   * @param book - The book entity to be mapped
   * @returns The book model
   */
  public static toModel(book: BookEntity): BookModel {
    return {
      id: book.getId().getValue(),
      title: book.getTitle(),
      author: book.getAuthor(),
      description: book.getDescription(),
      ISBN10: book.getISBN10() ? book.getISBN10()!.getValue() : null,
      ISBN13: book.getISBN13() ? book.getISBN13()!.getValue() : null,
      pages: book.getPages()!.getValue(),
      cover_url: book.getCoverUrl() ? book.getCoverUrl()!.getValue() : null,
      createdAt: book.getCreatedAt()!,
      updatedAt: book.getUpdatedAt()!,
      createdById: book.getCreatedById().getValue(),
    };
  }

  /**
   * Map a book model to a book entity
   * @param book - The book model to be mapped
   * @returns The book entity
   */
  public static toEntity(book: BookModel): BookEntity {
    return BookEntity.reconstitute(
      new ObjectIdValueObject(book.id),
      book.title,
      new PageValueObject(book.pages),
      new ObjectIdValueObject(book.createdById),
      book.author,
      book.description,
      book.ISBN10 ? new ISBNValueObject(book.ISBN10) : null,
      book.ISBN13 ? new ISBNValueObject(book.ISBN13) : null,
      book.cover_url ? new UrlValueObject(book.cover_url) : null,
      book.createdAt,
      book.updatedAt,
    );
  }
}
