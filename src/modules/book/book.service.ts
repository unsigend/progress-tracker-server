// import dependencies
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@modules/database/prisma.service";
import { Prisma, Book } from "@prisma/client";

// import dto
import { CreateBookDto } from "@modules/book/dto/create-book.dto";
import { UpdateBookDto } from "@modules/book/dto/update-book.dto";
import { QueryBookDto } from "@modules/book/dto/query-book.dto";

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find a book by a unique key
   * @param where - The unique key to find the book
   * @returns The book or null if the book is not found
   * @private
   */
  private async findBy(
    where: Prisma.BookWhereUniqueInput,
  ): Promise<Book | null> {
    const book: Book | null = await this.prisma.book.findUnique({
      where,
    });

    return book;
  }

  /**
   * Find a book by id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  public async findByID(id: string): Promise<Book | null> {
    const book: Book | null = await this.findBy({ id });
    return book;
  }

  /**
   * Create a book
   * @param createBookDto - The data to create the book
   * @returns The book or null if the book is not found
   */
  public async create(createBookDto: CreateBookDto): Promise<Book | null> {
    const book: Book | null = await this.prisma.book.create({
      data: createBookDto,
    });

    return book;
  }

  /**
   * Update a book
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  public async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    const book: Book | null = await this.prisma.book.update({
      where: { id },
      data: { ...updateBookDto, updatedAt: new Date() },
    });

    return book;
  }

  /**
   * Delete a book
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  public async delete(id: string): Promise<Book | null> {
    try {
      const book: Book | null = await this.prisma.book.delete({
        where: { id },
      });

      return book;
    } catch {
      throw new NotFoundException();
    }
  }

  public async findAll(queryBookDto: QueryBookDto): Promise<Book[]> {
    // set default values
    if (!queryBookDto.page) {
      queryBookDto.page = 1;
    }
    if (!queryBookDto.limit) {
      queryBookDto.limit = 10;
    }
    if (!queryBookDto.sort) {
      queryBookDto.sort = "createdAt";
    }
    if (!queryBookDto.order) {
      queryBookDto.order = "desc";
    }

    const books: Book[] = await this.prisma.book.findMany({
      where: queryBookDto.search
        ? {
            OR: [
              { title: { contains: queryBookDto.search, mode: "insensitive" } },
              {
                author: { contains: queryBookDto.search, mode: "insensitive" },
              },
              {
                ISBN10: { contains: queryBookDto.search, mode: "insensitive" },
              },
              {
                ISBN13: { contains: queryBookDto.search, mode: "insensitive" },
              },
            ],
          }
        : {},
      skip: (queryBookDto.page - 1) * queryBookDto.limit,
      take: queryBookDto.limit,
      orderBy: {
        [queryBookDto.sort]: queryBookDto.order,
      },
    });

    return books;
  }
}
