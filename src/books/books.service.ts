// import dependencies
import { Injectable } from "@nestjs/common";

// import DTOs
import { CreateBookDto, UpdateBookDto, QueryBookDto } from "@/books/books.dto";

@Injectable()
export class BooksService {
  async findAll(query: QueryBookDto): Promise<string> {
    return `Books ${query.search} ${query.page} ${query.limit} ${query.sortBy} ${query.sortOrder}`;
  }

  async findOne(id: string): Promise<string> {
    return `Book ${id}`;
  }

  async create(book: CreateBookDto): Promise<string> {
    return `Book ${book.title} created`;
  }

  async update(id: string, book: UpdateBookDto): Promise<string> {
    return `Book ${id} updated with ${book.title} ${book.author} ${book.description} ${book.pages} ${book.ISBN}`;
  }

  async remove(id: string): Promise<string> {
    return `Book ${id} deleted`;
  }
}
