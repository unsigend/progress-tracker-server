// import dependencies
import { Injectable } from "@nestjs/common";

// import DTO
import { QueryBookDto } from "@/books/dto/queryBook.dto";
import { CreateBookDto } from "@/books/dto/createBook.dto";
import { UpdateBookDto } from "@/books/dto/updateBook.dto";

@Injectable()
export class BooksService {
  async findAll(queryBookDto: QueryBookDto) {
    return "find all books";
  }

  async findOne(id: string) {
    return `find one book ${id}`;
  }

  async create(createBookDto: CreateBookDto) {
    return `create book ${createBookDto}`;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return `update book ${id} ${updateBookDto}`;
  }

  async delete(id: string) {
    return `delete book ${id}`;
  }
}
