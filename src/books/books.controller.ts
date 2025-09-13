// import dependencies
import { Controller } from "@nestjs/common";
import { Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import DTO
import { CreateBookDto } from "@/books/dto/create-book.dto";
import { QueryBookDto } from "@/books/dto/query-book.dto";
import { UpdateBookDto } from "@/books/dto/update-book.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Find all books
   *
   * @remarks This endpoint returns all books with query parameters
   */
  @Get()
  findAll(@Query() queryBookDto: QueryBookDto): Promise<string | null> {
    const books = this.booksService.findAll(queryBookDto);
    return books;
  }

  /**
   * Find one book
   *
   * @remarks This endpoint returns a single book by ID
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<string | null> {
    const book = this.booksService.findOne(id);
    return book;
  }

  /**
   * Create a new book
   *
   * @remarks This endpoint creates a new book
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<string | null> {
    const book = this.booksService.create(createBookDto);
    return book;
  }

  /**
   * Update a book
   *
   * @remarks This endpoint updates a book by ID
   */
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<string | null> {
    const book = this.booksService.update(id, updateBookDto);
    return book;
  }

  /**
   * Delete a book
   *
   * @remarks This endpoint deletes a book by ID
   */
  @Delete(":id")
  delete(@Param("id") id: string): Promise<string | null> {
    const book = this.booksService.delete(id);
    return book;
  }
}
