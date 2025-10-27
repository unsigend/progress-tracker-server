// import dependencies
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Book as BookModel } from "@prisma/client";
import { ISBNValueObject } from "@/modules/reading/domain/object-value/isbn.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { PagesValueObject } from "../../domain/object-value/pages.vo";

/**
 * Book mapper
 * @description Book mapper which is used to map the book model to the book entity.
 */
export class BookMapper {
  /**
   * Map a book model to a book entity
   * @param bookModel - The book model to map
   * @returns The book entity
   */
  public static toEntity(bookModel: BookModel): BookEntity {
    return BookEntity.reconstitute(
      new ObjectIdValueObject(bookModel.id),
      bookModel.title,
      new PagesValueObject(bookModel.pages),
      new ObjectIdValueObject(bookModel.createdById),
      bookModel.author,
      bookModel.description,
      bookModel.ISBN10 ? new ISBNValueObject(bookModel.ISBN10) : null,
      bookModel.ISBN13 ? new ISBNValueObject(bookModel.ISBN13) : null,
      bookModel.cover_url ? new UrlValueObject(bookModel.cover_url) : null,
      bookModel.createdAt,
      bookModel.updatedAt,
    );
  }

  /**
   * Map a book entity to a book model
   * @param book - The book entity to map
   * @returns The book model
   */
  public static toModel(book: BookEntity): BookModel {
    return {
      id: book.getId().getId(),
      title: book.getTitle(),
      pages: book.getPages().getPages(),
      createdById: book.getCreatedById().getId(),
      author: book.getAuthor(),
      description: book.getDescription(),
      ISBN10: book.getISBN10()?.getISBN() ?? null,
      ISBN13: book.getISBN13()?.getISBN() ?? null,
      cover_url: book.getCoverUrl()?.getUrl() ?? null,
      createdAt: book.getCreatedAt(),
      updatedAt: book.getUpdatedAt(),
    };
  }
}
