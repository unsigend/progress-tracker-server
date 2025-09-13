// import dependencies
import { Controller } from "@nestjs/common";
import { Get, Post, Put, Delete } from "@nestjs/common";
import { Param, Body, Query } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import DTO
import { CreateBookDto } from "@/books/dto/createBook.dto";
import { QueryBookDto } from "@/books/dto/queryBook.dto";
import { UpdateBookDto } from "@/books/dto/updateBook.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  // GET /books
  findAll(@Query() queryBookDto: QueryBookDto): Promise<string | null> {
    const books = this.booksService.findAll(queryBookDto);
    return books;
  }

  @Get(":id")
  // GET /books/:id
  findOne(@Param("id") id: string): Promise<string | null> {
    const book = this.booksService.findOne(id);
    return book;
  }

  @Post()
  // POST /books
  create(@Body() createBookDto: CreateBookDto): Promise<string | null> {
    const book = this.booksService.create(createBookDto);
    return book;
  }

  @Put(":id")
  // PUT /books/:id
  update(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<string | null> {
    const book = this.booksService.update(id, updateBookDto);
    return book;
  }

  @Delete(":id")
  // DELETE /books/:id
  delete(@Param("id") id: string): Promise<string | null> {
    const book = this.booksService.delete(id);
    return book;
  }
}
