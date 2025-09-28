// import dependencies
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Patch,
  NotFoundException,
  Res,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import type { Response } from "express";

// import pipes
import { ParseUUIDPipe } from "@nestjs/common";
// import services
import { BookService } from "@modules/book/book.service";
// import dto
import { CreateBookDto } from "@modules/book/dto/create-book.dto";
import { BookResponseDto } from "@modules/book/dto/book-response.dto";
import { UpdateBookDto } from "@modules/book/dto/update-book.dto";
import { QueryBookDto } from "@modules/book/dto/query-book.dto";
import { AllBookResponseDto } from "@modules/book/dto/all-book-response.dto";
import { Book } from "@prisma/client";

@Controller("books")
@ApiTags("Books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Create a book
   * @route POST api/v1/books
   * @param createBookDto - The data to create the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Create a book" })
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({
    type: BookResponseDto,
    description: "The book created successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not created",
  })
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.create(createBookDto);
    return book as BookResponseDto;
  }

  /**
   * Get a book by id
   * @route GET api/v1/books/:id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Get a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not found",
  })
  @Get(":id")
  async findByID(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.findByID(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book as BookResponseDto;
  }

  /**
   * Update a book by id
   * @route PUT api/v1/books/:id
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Update a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not updated",
  })
  @Put(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.update(id, updateBookDto);
    return book as BookResponseDto;
  }

  /**
   * Delete a book by id
   * @route DELETE api/v1/books/:id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Delete a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book deleted successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not deleted",
  })
  @Delete(":id")
  async deleteByID(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.delete(id);
    return book as BookResponseDto;
  }

  /**
   * Get all books
   * @route GET api/v1/books
   * @param queryBookDto - The query parameters
   * @note set header x-total-count to the total number of books
   * @returns the books and the total number of books
   */
  @ApiOperation({ summary: "Get all books and set header x-total-count" })
  @ApiOkResponse({
    type: AllBookResponseDto,
    description: "The books retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "Books not found",
  })
  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() queryBookDto: QueryBookDto,
  ): Promise<AllBookResponseDto> {
    // get books
    const books: AllBookResponseDto =
      await this.bookService.findAll(queryBookDto);
    // set header x-total-count
    res.setHeader("x-total-count", books.totalCount.toString());
    return books;
  }

  /**
   * Replace a book by id
   * @route PUT api/v1/books/:id
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Replace a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book replaced successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not found",
  })
  @Put(":id")
  async replace(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.update(id, updateBookDto);
    return book as BookResponseDto;
  }

  /**
   * Patch a book by id
   * @route PATCH api/v1/books/:id
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Patch a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book patched successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not patched",
  })
  @Patch(":id")
  async patch(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.update(id, updateBookDto);
    return book as BookResponseDto;
  }
}
