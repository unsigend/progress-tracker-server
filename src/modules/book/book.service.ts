// import dependencies
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@modules/database/prisma.service";
import { Prisma, Book } from "@prisma/client";

// import dto
import { CreateBookDto } from "@modules/book/dto/create-book.dto";
import { UpdateBookDto } from "@modules/book/dto/update-book.dto";
import { QueryBookDto } from "@modules/book/dto/query-book.dto";
import { AllBookResponseDto } from "@modules/book/dto/all-book-response.dto";

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
    try {
      const book: Book | null = await this.prisma.book.create({
        data: createBookDto,
      });

      return book;
    } catch {
      throw new BadRequestException("Failed to create book");
    }
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
    try {
      const book: Book | null = await this.prisma.book.update({
        where: { id },
        data: { ...updateBookDto, updatedAt: new Date() },
      });

      return book;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        // Record not found
        throw new NotFoundException("Book not found");
      }
      throw new BadRequestException("Failed to update book");
    }
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        // Record not found
        throw new NotFoundException("Book not found");
      }
      throw new BadRequestException("Failed to delete book");
    }
  }

  /**
   * Find all books
   * @param queryBookDto - The query parameters
   * @returns The books or null if the books are not found
   */
  public async findAll(
    queryBookDto: QueryBookDto,
  ): Promise<AllBookResponseDto> {
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

    if (!queryBookDto.search) {
      const totalCount: number = await this.getTotalCount();
      return {
        books,
        totalCount,
      };
    }

    return {
      books,
      totalCount: books.length,
    };
  }

  /**
   * Get the total number of books
   * @returns The total number of books
   */
  public async getTotalCount(): Promise<number> {
    const totalCount: number = await this.prisma.book.count();
    return totalCount;
  }
}
