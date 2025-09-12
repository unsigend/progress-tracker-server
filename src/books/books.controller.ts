// import dependencies
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('books')
export class BooksController {
  @Get()
  getBooks(): string {
    return 'Books';
  }

  @Get(':id')
  getBook(@Param('id') id: string): string {
    return `Book ${id}`;
  }

  @Post()
  createBook(): string {
    return 'Book created';
  }

  @Put(':id')
  updateBook(@Param('id') id: string): string {
    return `Book ${id} updated`;
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): string {
    return `Book ${id} deleted`;
  }
}
