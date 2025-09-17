/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// import dependencies
import { Injectable, BadRequestException } from "@nestjs/common";

// import DTO
import { QueryBookDto } from "@/books/dto/query-book.dto";
import { CreateBookDto } from "@/books/dto/create-book.dto";
import { UpdateBookDto } from "@/books/dto/update-book.dto";

// import services
import { PrismaService } from "@/prisma/prisma.service";

// import models
import { Book } from "@prisma/client";

/**
 * Books service
 *
 * @remarks This service handles all book-related database operations
 */
@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find all books
   *
   * @remarks Retrieves books with optional filtering, pagination, and sorting
   * @param queryBookDto - Query parameters for filtering and pagination
   * @returns Array of books matching the criteria
   */
  async findAll(queryBookDto: QueryBookDto): Promise<Book[]> {
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
   * Find a book by ID
   *
   * @remarks Retrieves a specific book by its unique identifier
   * @param id - The unique identifier of the book
   * @returns The book if found, null otherwise
   */
  async findById(id: string): Promise<Book | null> {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    return book;
  }

  /**
   * Create a new book
   *
   * @remarks Creates a new book in the database
   * @param createBookDto - The book data for creation
   * @returns The newly created book
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.prismaService.book.create({
      data: createBookDto,
    });
    return book;
  }

  /**
   * Update a book (PATCH operation)
   *
   * @remarks Partially updates a book with only the provided fields
   * @param id - The unique identifier of the book
   * @param updateBookDto - The fields to update
   * @returns The updated book or null if not found
   */
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    // Throw an error if the DTO is empty
    if (Object.keys(updateBookDto).length === 0) {
      throw new BadRequestException("At least one field must be provided");
    }

    // Remove undefined values
    const filteredData = Object.fromEntries(
      Object.entries(updateBookDto).filter(([, value]) => value !== undefined),
    );

    // If no fields to update, return the existing book
    if (Object.keys(filteredData).length === 0) {
      return await this.findById(id);
    }

    // Update the book with the new data
    const book = await this.prismaService.book.update({
      where: { id },
      data: {
        ...filteredData,
        updatedAt: new Date(),
      },
    });
    return book;
  }

  /**
   * Replace a book (PUT operation)
   *
   * @remarks Completely replaces a book's data with the provided data
   * @param id - The unique identifier of the book
   * @param updateBookDto - The complete book data
   * @returns The updated book or null if not found
   */
  async replace(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    // Get the existing book
    const existingBook = await this.findById(id);
    if (!existingBook) {
      return null;
    }

    // Create a new book object with default values
    const newBook: CreateBookDto = {
      title: existingBook.title,
      author: existingBook.author || "",
      ISBN: existingBook.ISBN || "",
      description: existingBook.description || "",
      pages: existingBook.pages || undefined,
      imageURL: existingBook.imageURL || "",
    };

    // Merge the new data with the default values
    const dataToUpdate: any = { ...newBook, ...updateBookDto };

    // Update the book with the new data
    const book = await this.prismaService.book.update({
      where: { id },
      data: {
        ...dataToUpdate,
        updatedAt: new Date(),
      },
    });
    return book;
  }

  /**
   * Delete a book
   *
   * @remarks Permanently deletes a book from the database
   * @param id - The unique identifier of the book to delete
   * @returns The deleted book if found, null otherwise
   */
  async delete(id: string): Promise<Book | null> {
    const book = await this.prismaService.book.delete({
      where: { id },
    });
    return book;
  }
}
