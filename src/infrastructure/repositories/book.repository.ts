// import dependencies
import { Injectable } from "@nestjs/common";
import { Book as BookModel, Prisma } from "@prisma/client";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { ISBNValueObject } from "@domain/value-objects/book/isbn.vo";

// import queries
import { BookQuery } from "@domain/repositories/queries/book.query";

// import repositories
import { IBookRepository } from "@domain/repositories/book.repository";

// import services
import { PostgreSQLService } from "@/infrastructure/database/postgresql/service/postgresql.service";

// import mappers
import { BookMapper } from "@/infrastructure/mapper/book.mapper";

/**
 * Book repository
 * @description Book repository
 */
@Injectable()
export class BookRepository implements IBookRepository {
  constructor(private readonly postgresqlService: PostgreSQLService) {}

  /**
   * Save a book updates or creates a new book
   * @description Save a book
   * @param book - The book to be saved
   */
  async save(book: BookEntity): Promise<void> {
    // map to the prisma book model
    const bookModel: BookModel = BookMapper.toModel(book);

    // update or create the book
    await this.postgresqlService.book.upsert({
      where: { id: bookModel.id },
      update: bookModel,
      create: bookModel,
    });
  }

  /**
   * Find a book by id
   * @description Find a book by id
   * @param id - The id of the book to be found
   * @returns The book or null if not found
   */
  async findById(id: ObjectIdValueObject): Promise<BookEntity | null> {
    const bookModel: BookModel | null =
      await this.postgresqlService.book.findUnique({
        where: { id: id.getValue() },
      });
    return bookModel ? BookMapper.toEntity(bookModel) : null;
  }

  /**
   * Find books by created by id
   * @description Find books by created by id
   * @param createdById - The id of the user who created the books
   * @returns The books and total count
   */
  async findByCreatedById(
    createdById: ObjectIdValueObject,
  ): Promise<{ books: BookEntity[]; totalCount: number }> {
    const books: BookModel[] = await this.postgresqlService.book.findMany({
      where: { createdById: createdById.getValue() },
    });
    return {
      books: books.map((book) => BookMapper.toEntity(book)),
      totalCount: books.length,
    };
  }

  /**
   * Find books by ISBN 10
   * @description Find a book by ISBN 10
   * @param isbn10 - The ISBN 10 of the books to be found
   * @returns The book or null if not found
   */
  async findByISBN10(isbn10: ISBNValueObject): Promise<BookEntity | null> {
    const bookModel: BookModel | null =
      await this.postgresqlService.book.findUnique({
        where: { ISBN10: isbn10.getValue() },
      });
    return bookModel ? BookMapper.toEntity(bookModel) : null;
  }

  /**
   * Find a book by ISBN 13
   * @description Find a book by ISBN 13
   * @param isbn13 - The ISBN 13 of the books to be found
   * @returns The book or null if not found
   */
  async findByISBN13(isbn13: ISBNValueObject): Promise<BookEntity | null> {
    const bookModel: BookModel | null =
      await this.postgresqlService.book.findUnique({
        where: { ISBN13: isbn13.getValue() },
      });
    return bookModel ? BookMapper.toEntity(bookModel) : null;
  }

  /**
   * Find all books
   * @description Find all books
   * @param query - The query to be used to find the books
   * @returns All books and total count
   */
  async findAll(
    query: BookQuery,
  ): Promise<{ books: BookEntity[]; totalCount: number }> {
    const whereClause: Prisma.BookWhereInput = {};
    const sortClause: Prisma.BookOrderByWithRelationInput = {};

    // build the where clause
    if (query.getValue()) {
      // if the both key and value are provided use them to filter
      if (query.getKey()) {
        whereClause[query.getKey()!] = {
          contains: query.getValue(),
          mode: "insensitive",
        };
      }
      // if only the value is provided
      // then filter according to OR(title | author | ISBN10 | ISBN13)
      else {
        whereClause["OR"] = [
          { title: { contains: query.getValue()!, mode: "insensitive" } },
          { author: { contains: query.getValue()!, mode: "insensitive" } },
          { ISBN10: { contains: query.getValue()!, mode: "insensitive" } },
          { ISBN13: { contains: query.getValue()!, mode: "insensitive" } },
        ];
      }
    }

    // build the sort clause
    if (query.getOrder() && query.getSort()) {
      sortClause[query.getSort()] = query.getOrder();
    } else {
      sortClause["createdAt"] = "desc";
    }

    // build the page and limit
    const page = query.getPage() ?? 1;
    const limit = query.getLimit() ?? 10;
    const skip = (page - 1) * limit;

    // get the books
    const books: BookModel[] = await this.postgresqlService.book.findMany({
      where: whereClause,
      orderBy: sortClause,
      skip: skip,
      take: limit,
    });

    // get the total count
    const totalCount: number = await this.postgresqlService.book.count({
      where: whereClause,
    });

    return {
      books: books.map((book) => BookMapper.toEntity(book)),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a book
   * @description Delete a book
   * @param id - The id of the book to be deleted
   */
  async delete(id: ObjectIdValueObject): Promise<void> {
    await this.postgresqlService.book.delete({
      where: { id: id.getValue() },
    });
  }
}
