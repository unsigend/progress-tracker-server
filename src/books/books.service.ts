// import dependencies
import { Injectable } from "@nestjs/common";

// import DTO
import { QueryBookDto } from "@/books/dto/query-book.dto";
import { CreateBookDto } from "@/books/dto/create-book.dto";
import { UpdateBookDto } from "@/books/dto/update-book.dto";
import { PatchBookDto } from "@/books/dto/update-book.dto";

// import services
import { PrismaService } from "@/prisma/prisma.service";

// import models
import { Book } from "@prisma/client";

/**
 * Books service
 *
 * @remarks This service is used to interact with the books database
 */
@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find all books
   *
   * @remarks This method returns all books with query parameters
   */
  async findAll(queryBookDto: QueryBookDto): Promise<Book[] | null> {
    const {
      search = "",
      page = 1,
      limit = 10,
      sortedBy = "createdAt",
      sortOrder = "desc",
    } = queryBookDto;
    const skip = (page - 1) * limit;
    const take = limit;
    const orderBy = { [sortedBy]: sortOrder };
    const where = {
      OR: [
        { title: { contains: search } },
        { author: { contains: search } },
        { ISBN: { contains: search } },
      ],
    };
    const books = await this.prismaService.book.findMany({
      where,
      skip,
      take,
      orderBy,
    });
    return books;
  }

  /**
   * Find one book
   *
   * @remarks This method returns a single book by ID
   */
  async findOne(id: string): Promise<Book | null> {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    return book;
  }

  /**
   * Create a new book
   *
   * @remarks This method creates a new book
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.prismaService.book.create({
      data: createBookDto,
    });
    return book;
  }

  /**
   * Update a book (PUT - replaces entire resource)
   *
   * @remarks This method updates a book by ID with all fields
   */
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.prismaService.book.update({
      where: { id },
      data: {
        ...updateBookDto,
        updatedAt: new Date(),
      },
    });
    return book;
  }

  /**
   * Patch a book (PATCH - partial update)
   *
   * @remarks This method partially updates a book by ID
   */
  async patch(id: string, patchBookDto: PatchBookDto): Promise<Book> {
    const book = await this.prismaService.book.update({
      where: { id },
      data: {
        ...patchBookDto,
        updatedAt: new Date(),
      },
    });
    return book;
  }

  /**
   * Delete a book
   *
   * @remarks This method deletes a book by ID
   */
  async delete(id: string): Promise<Book> {
    const book = await this.prismaService.book.delete({
      where: { id },
    });
    return book;
  }
}
