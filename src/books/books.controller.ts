// import dependencies
import { BadRequestException, Controller, Patch } from "@nestjs/common";
import { Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import DTO
import { CreateBookDto } from "@/books/dto/create-book.dto";
import { QueryBookDto } from "@/books/dto/query-book.dto";
import { PatchBookDto, UpdateBookDto } from "@/books/dto/update-book.dto";
import { BookResponseDto } from "@/books/dto/book-response.dto";

// import models
import { Book } from "@prisma/client";

// import pipes
import { ParseUUIDPipe } from "@nestjs/common";

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
   * Find all books
   *
   * @remarks This endpoint returns all books with query parameters
   */
  @ApiResponse({
    status: 200,
    description: "Books retrieved successfully",
    type: [BookResponseDto],
  })
  @Get()
  async findAll(
    @Query() queryBookDto: QueryBookDto,
  ): Promise<BookResponseDto[] | null> {
    const books: Book[] | null = await this.booksService.findAll(queryBookDto);
    return books;
  }

  /**
   * Find one book
   *
   * @remarks This endpoint returns a single book by ID
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
  async findOne(
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
  ): Promise<BookResponseDto | null> {
    const book: Book | null = await this.booksService.findOne(id);
    return book;
  }

  /**
   * Create a new book
   *
   * @remarks This endpoint creates a new book
   */
  @ApiCreatedResponse({
    description: "Book created successfully",
    type: BookResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid book data",
  })
  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookResponseDto | null> {
    const book: Book | null = await this.booksService.create(createBookDto);
    return book;
  }

  /**
   * Update a book
   *
   * @remarks This endpoint updates a book by ID
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
  @Put(":id")
  async update(
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
  ): Promise<BookResponseDto | null> {
    const book: Book | null = await this.booksService.update(id, updateBookDto);
    return book;
  }

  /**
   * Patch a book
   *
   * @remarks This endpoint patches a book by ID
   */
  @ApiResponse({
    status: 200,
    description: "Book patched successfully",
    type: BookResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid book ID format or data",
  })
  @Patch(":id")
  async patch(
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
    @Body() patchBookDto: PatchBookDto,
  ): Promise<BookResponseDto | null> {
    const book: Book | null = await this.booksService.patch(id, patchBookDto);
    return book;
  }

  /**
   * Delete a book
   *
   * @remarks This endpoint deletes a book by ID
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
  async delete(
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
  ): Promise<BookResponseDto | null> {
    const book: Book | null = await this.booksService.delete(id);
    return book;
  }
}
