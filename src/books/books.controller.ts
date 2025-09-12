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
import { QueryBookDto, UpdateBookDto, CreateBookDto } from "@/books/books.dto";

// import services
import { BooksService } from "@/books/books.service";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query() query: QueryBookDto): Promise<string> {
    const books = await this.booksService.findAll(query);
    return books;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<string> {
    const book = await this.booksService.findOne(id);
    return book;
  }

  @Post()
  async create(@Body() book: CreateBookDto): Promise<string> {
    const newBook = await this.booksService.create(book);
    return newBook;
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() book: UpdateBookDto,
  ): Promise<string> {
    const updatedBook = await this.booksService.update(id, book);
    return updatedBook;
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<string> {
    const book = await this.booksService.remove(id);
    return book;
  }
}
