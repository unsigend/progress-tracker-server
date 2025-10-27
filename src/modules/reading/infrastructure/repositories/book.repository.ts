// import dependencies
import { IBookRepository } from "@/modules/reading/domain/repositories/book.repository";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";
import { BookMapper } from "../mapper/book.mapper";
import { Book as BookModel, Prisma } from "@prisma/client";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { ServerException } from "@/shared/domain/exceptions/server.exception";
import { Logger } from "@nestjs/common";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
/**
 * Book repository
 * @description Book repository which is used to store the book information.
 */
export class BookRepository implements IBookRepository {
  constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a book
   * @param book - The book to save
   * @returns void
   */
  public async save(book: BookEntity): Promise<void> {
    // map the book entity to the book model
    const bookModel: BookModel = BookMapper.toModel(book);
    // upsert the book model into the database
    await this.postgresqlService.book.upsert({
      where: { id: bookModel.id },
      update: bookModel,
      create: bookModel,
    });
  }

  /**
   * Find a book by ISBN10
   * @param isbn10 - The ISBN10 of the book
   * @returns The book or null if not found
   */
  public async findByISBN10(isbn10: string): Promise<BookEntity | null> {
    // find the book by ISBN10
    const bookModel: BookModel | null =
      await this.postgresqlService.book.findUnique({
        where: { ISBN10: isbn10 },
      });
    return bookModel ? BookMapper.toEntity(bookModel) : null;
  }

  /**
   * Find a book by ISBN13
   * @param isbn13 - The ISBN13 of the book
   * @returns The book or null if not found
   */
  public async findByISBN13(isbn13: string): Promise<BookEntity | null> {
    // find the book by ISBN13
    const bookModel: BookModel | null =
      await this.postgresqlService.book.findUnique({
        where: { ISBN13: isbn13 },
      });
    return bookModel ? BookMapper.toEntity(bookModel) : null;
  }

  /**
   * Find books by created by
   * @param createdById - The id of the user who created the book
   * @returns The books and the total count of the books
   */
  public async findByCreatedBy(
    createdById: ObjectIdValueObject,
  ): Promise<{ data: BookEntity[]; totalCount: number }> {
    // find the books by created by
    const bookModels: BookModel[] = await this.postgresqlService.book.findMany({
      where: { createdById: createdById.getId() },
    });
    return {
      data: bookModels.map((bookModel) => BookMapper.toEntity(bookModel)),
      totalCount: bookModels.length,
    };
  }

  /**
   * Find a book by id
   * @param id - The id of the book
   * @returns The book or null if not found
   */
  public async findById(id: ObjectIdValueObject): Promise<BookEntity | null> {
    // find the book by id
    const bookModel: BookModel | null =
      await this.postgresqlService.book.findUnique({
        where: { id: id.getId() },
      });
    return bookModel ? BookMapper.toEntity(bookModel) : null;
  }

  /**
   * Find all books
   * @param query - The query to find the books
   * @returns The books and the total count of the books
   */
  public async findAll(
    query: QueryBase,
  ): Promise<{ data: BookEntity[]; totalCount: number }> {
    // find the books by query
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.BookWhereInput,
      Prisma.BookOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find all books
    let bookModels: BookModel[] = [];
    try {
      bookModels = await this.postgresqlService.book.findMany({
        where: whereClause,
        orderBy: orderClause,
        take: take,
        skip: skip,
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ValidationException("Invalid query key");
      }
      Logger.error(error);
      throw new ServerException("An unexpected error occurred");
    }

    // get the total count of the books
    const totalCount: number = await this.postgresqlService.book.count({
      where: whereClause,
    });

    return {
      data: bookModels.map((bookModel) => BookMapper.toEntity(bookModel)),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a book by id
   * @param id - The id of the book
   * @returns True if the book was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the book by id
    const result: BookModel | null = await this.postgresqlService.book.delete({
      where: { id: id.getId() },
    });
    return result ? true : false;
  }
}
