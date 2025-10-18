// Book Repository Infrastructure Implementation

// import dependencies
import { Injectable } from "@nestjs/common";

// import interfaces
import {
  BookQueryInterface,
  BookRepositoryInterface,
} from "@/domain/repositories/book.repository.interface";

// import entities
import { Book } from "@/domain/entities/book.entity";

// import services
import { PrismaService } from "@/modules/database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class BookRepository implements BookRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a book
   * @param book - The book to create
   * @returns The created book
   */
  public async create(book: Book): Promise<Book> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, ...bookData } = book;
    return await this.prisma.book.create({ data: bookData as Book });
  }

  /**
   * Find all books
   * @param query - The query
   * @returns The books and the total number of books
   */
  public async findAll(
    query?: BookQueryInterface,
  ): Promise<{ books: Book[]; totalCount: number }> {
    // build the where clause
    const whereClause: Prisma.BookWhereInput = {};
    if (query?.value) {
      if (query.key) {
        whereClause[query.key] = { contains: query.value, mode: "insensitive" };
      } else {
        whereClause.OR = [
          { title: { contains: query.value, mode: "insensitive" } },
          { author: { contains: query.value, mode: "insensitive" } },
          { ISBN10: { contains: query.value, mode: "insensitive" } },
          { ISBN13: { contains: query.value, mode: "insensitive" } },
        ];
      }
    }

    // build the order by clause
    const orderByClause: Prisma.BookOrderByWithRelationInput = {};
    if (query?.order && query?.sort) {
      orderByClause[query.sort] = query.order;
    }

    // build the skip and take clauses
    const take: number = query?.limit ?? 10;
    const skip: number = ((query?.page ?? 1) - 1) * take;

    // get the books
    const books: Book[] = await this.prisma.book.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip,
      take,
    });

    // get the total count
    const totalCount: number = await this.prisma.book.count({
      where: whereClause,
    });

    return { books, totalCount };
  }

  /**
   * Find a book by id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  public async findById(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({ where: { id } });
  }

  /**
   * Update a book
   * @param book - The book to update
   * @returns The updated book or null if the book is not found
   */
  public async update(book: Book): Promise<Book | null> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, ...bookData } = book;
    return await this.prisma.book.update({
      where: { id },
      data: bookData as Book,
    });
  }

  /**
   * Delete a book
   * @param id - The id of the book
   * @returns The deleted book or null if the book is not found
   */
  public async delete(id: string): Promise<Book | null> {
    return await this.prisma.book.delete({ where: { id } });
  }
}
