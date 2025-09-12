// import dependencies
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Body,
} from "@nestjs/common";

// import DTOs
import {
  QueryBookDto,
  UpdateBookDto,
  CreateBookDto,
} from "@/books/dto/books.dto";

// import services
import { BooksService } from "@/books/books.service";

// import Book Model
import { Book } from "@prisma/client";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query() query: QueryBookDto): Promise<Book[] | null> {
    const books = await this.booksService.findAll(query);
    return books;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Book | null> {
    const book = await this.booksService.findOne(id);
    return book;
  }

  @Post()
  async create(@Body() book: CreateBookDto): Promise<Book> {
    const newBook = await this.booksService.create(book);
    return newBook;
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    const updatedBook = await this.booksService.update(id, book);
    return updatedBook;
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Book> {
    const book = await this.booksService.remove(id);
    return book;
  }
}
