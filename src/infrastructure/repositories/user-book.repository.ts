// User Book Repository Infrastructure Implementation

// import dependencies
import { Injectable } from "@nestjs/common";
import {
  Prisma,
  UserBook as PrismaUserBook,
  ReadingStatus as PrismaReadingStatus,
} from "@prisma/client";

// import interfaces
import {
  UserBookQueryInterface,
  UserBookRepositoryInterface,
} from "@/domain/repositories/user-book.repository.interface";

// import entities
import { ReadingStatus, UserBook } from "@/domain/entities/user-book.entity";

// import services
import { PrismaService } from "@/modules/database/prisma.service";

@Injectable()
export class UserBookRepository implements UserBookRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Map the reading status to the prisma reading status
   * @param status - The reading status
   * @returns The prisma reading status
   */
  private mapToPrismaStatus(status: ReadingStatus): PrismaReadingStatus {
    if (status === ReadingStatus.IN_PROGRESS) {
      return PrismaReadingStatus.IN_PROGRESS;
    } else {
      return PrismaReadingStatus.COMPLETED;
    }
  }

  /**
   * Map the prisma reading status to the reading status
   * @param status - The prisma reading status
   * @returns The reading status
   */
  private mapToDomainStatus(status: PrismaReadingStatus): ReadingStatus {
    if (status === PrismaReadingStatus.IN_PROGRESS) {
      return ReadingStatus.IN_PROGRESS;
    } else {
      return ReadingStatus.COMPLETED;
    }
  }

  /**
   * Create a user book
   * @param userBook - The user book to create
   * @returns The created user book
   */
  public async create(userBook: UserBook): Promise<UserBook> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, status, ...userBookData } = userBook;
    const prismaUserBook: PrismaUserBook = {
      ...userBookData,
      status: this.mapToPrismaStatus(status),
    } as PrismaUserBook;

    // create the user book
    return (await this.prisma.userBook.create({
      data: prismaUserBook,
    })) as UserBook;
  }

  /**
   * Find all user books
   * @param query - The query
   * @returns The user books and the total number of user books
   */
  public async findAll(
    query?: UserBookQueryInterface,
  ): Promise<{ userBooks: UserBook[]; totalCount: number }> {
    // build the where clause
    const whereClause: Prisma.UserBookWhereInput = {};
    if (query?.userId) {
      whereClause.user_id = query.userId;
    }
    if (query?.bookId) {
      whereClause.book_id = query.bookId;
    }
    if (query?.status) {
      whereClause.status = this.mapToPrismaStatus(query.status);
    }

    // build the order by clause
    const orderByClause: Prisma.UserBookOrderByWithRelationInput = {};
    if (query?.order && query?.sort) {
      orderByClause[query.sort] = query.order;
    }

    // build the skip and take clauses
    const take: number = query?.limit ?? 10;
    const skip: number = ((query?.page ?? 1) - 1) * take;

    // get the user books
    const prismaUserBooks: PrismaUserBook[] =
      await this.prisma.userBook.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip,
        take,
      });

    // get the total count
    const totalCount: number = await this.prisma.userBook.count({
      where: whereClause,
    });

    return {
      userBooks: prismaUserBooks.map((prismaUserBook) => ({
        ...prismaUserBook,
        status: this.mapToDomainStatus(prismaUserBook.status),
      })),
      totalCount,
    };
  }

  /**
   * Find a user book by id
   * @param id - The id of the user book
   * @returns The user book or null if the user book is not found
   */
  public async findById(id: string): Promise<UserBook | null> {
    const prismaUserBook: PrismaUserBook | null =
      await this.prisma.userBook.findUnique({
        where: { id },
      });
    if (!prismaUserBook) {
      return null;
    }

    // map the prisma user book to the user book
    return {
      ...prismaUserBook,
      status: this.mapToDomainStatus(prismaUserBook.status),
    } as UserBook;
  }

  /**
   * Update a user book
   * @param userBook - The user book to update
   * @returns The updated user book or null if the user book is not found
   */
  public async update(userBook: UserBook): Promise<UserBook | null> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, status, ...userBookData } = userBook;
    const prismaUserBook: PrismaUserBook = {
      ...userBookData,
      status: this.mapToPrismaStatus(status),
    } as PrismaUserBook;

    // update the user book
    return (await this.prisma.userBook.update({
      where: { id },
      data: prismaUserBook,
    })) as UserBook;
  }

  /**
   * Delete a user book
   * @param id - The id of the user book
   * @returns The deleted user book or null if the user book is not found
   */
  public async delete(id: string): Promise<UserBook | null> {
    const prismaUserBook: PrismaUserBook | null =
      await this.prisma.userBook.delete({ where: { id } });
    if (!prismaUserBook) {
      return null;
    }

    // map the prisma user book to the user book
    return {
      ...prismaUserBook,
      status: this.mapToDomainStatus(prismaUserBook.status),
    } as UserBook;
  }
}
