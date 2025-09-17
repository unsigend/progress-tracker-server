// import dependencies
import {
  Controller,
  Delete,
  Body,
  Put,
  Param,
  Get,
  Post,
  NotFoundException,
  BadRequestException,
  Patch,
  HttpCode,
  HttpStatus,
  Query,
} from "@nestjs/common";

// import pipes
import { ParseUUIDPipe } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import DTO
import { CreateBookDto } from "@/books/dto/create-book.dto";
import { QueryBookDto } from "@/books/dto/query-book.dto";
import { UpdateBookDto } from "@/books/dto/update-book.dto";
import { BookResponseDto } from "@/books/dto/book-response.dto";

// import models
import { Book } from "@prisma/client";

// import swagger decorators
import {
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Create a new book
   *
   * @remarks Creates a new book in the system
   * @param createBookDto - The book data for creation
   * @returns The newly created book
   */
  @ApiCreatedResponse({
    description: "Book created successfully",
    type: BookResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid book data",
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookResponseDto> {
    const book: Book = await this.booksService.create(createBookDto);
    return book;
  }

  /**
   * Get book by ID
   *
   * @remarks Retrieves a specific book by its unique identifier
   * @param id - The unique identifier of the book
   * @returns The book's data
   */
  @ApiResponse({
    status: 200,
    description: "Book retrieved successfully",
    type: BookResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid book ID format",
  })
  @Get(":id")
  async getBookById(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid book ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.booksService.findById(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }

  /**
   * Get all books
   *
   * @remarks Retrieves books with optional filtering, pagination, and sorting
   * @param queryBookDto - Query parameters for filtering and pagination
   * @returns Array of books matching the criteria
   */
  @ApiResponse({
    status: 200,
    description: "Books retrieved successfully",
    type: [BookResponseDto],
  })
  @Get()
  async getAllBooks(
    @Query() queryBookDto: QueryBookDto,
  ): Promise<BookResponseDto[]> {
    const books: Book[] = await this.booksService.findAll(queryBookDto);
    return books;
  }

  /**
   * Update book by ID (PATCH)
   *
   * @remarks Partially updates a specific book with only provided fields
   * @param id - The unique identifier of the book
   * @param updateBookDto - The fields to update
   * @returns The updated book
   */
  @ApiResponse({
    status: 200,
    description: "Book updated successfully",
    type: BookResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid book ID format or data",
  })
  @Patch(":id")
  async updateBookById(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid book ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.booksService.update(id, updateBookDto);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }

  /**
   * Replace book by ID (PUT)
   *
   * @remarks Completely replaces a specific book's data
   * @param id - The unique identifier of the book
   * @param updateBookDto - The complete book data
   * @returns The updated book
   */
  @ApiResponse({
    status: 200,
    description: "Book replaced successfully",
    type: BookResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid book ID format or data",
  })
  @Put(":id")
  async replaceBookById(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid book ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.booksService.replace(
      id,
      updateBookDto,
    );
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }

  /**
   * Delete book by ID
   *
   * @remarks Permanently deletes a specific book
   * @param id - The unique identifier of the book to delete
   * @returns The deleted book
   */
  @ApiResponse({
    status: 200,
    description: "Book deleted successfully",
    type: BookResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid book ID format",
  })
  @Delete(":id")
  async deleteBookById(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid book ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.booksService.delete(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book;
  }
}
