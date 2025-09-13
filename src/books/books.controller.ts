// import dependencies
import { Controller, Patch } from "@nestjs/common";
import { Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import DTO
import { CreateBookDto } from "@/books/dto/create-book.dto";
import { QueryBookDto } from "@/books/dto/query-book.dto";
import { PatchBookDto, UpdateBookDto } from "@/books/dto/update-book.dto";

// import models
import { Book } from "@prisma/client";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Find all books
   *
   * @remarks This endpoint returns all books with query parameters
   */
  @Get()
  async findAll(@Query() queryBookDto: QueryBookDto): Promise<Book[] | null> {
    const books: Book[] | null = await this.booksService.findAll(queryBookDto);
    return books;
  }

  /**
   * Find one book
   *
   * @remarks This endpoint returns a single book by ID
   */
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Book | null> {
    const book: Book | null = await this.booksService.findOne(id);
    return book;
  }

  /**
   * Create a new book
   *
   * @remarks This endpoint creates a new book
   */
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book | null> {
    const book: Book | null = await this.booksService.create(createBookDto);
    return book;
  }

  /**
   * Update a book
   *
   * @remarks This endpoint updates a book by ID
   */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    const book: Book | null = await this.booksService.update(id, updateBookDto);
    return book;
  }

  /**
   * Patch a book
   *
   * @remarks This endpoint patches a book by ID
   */
  @Patch(":id")
  async patch(
    @Param("id") id: string,
    @Body() patchBookDto: PatchBookDto,
  ): Promise<Book | null> {
    const book: Book | null = await this.booksService.patch(id, patchBookDto);
    return book;
  }

  /**
   * Delete a book
   *
   * @remarks This endpoint deletes a book by ID
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Book | null> {
    const book: Book | null = await this.booksService.delete(id);
    return book;
  }
}
