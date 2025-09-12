// import dependencies
import { Injectable } from "@nestjs/common";

// import DTOs
import {
  CreateBookDto,
  UpdateBookDto,
  QueryBookDto,
} from "@/books/dto/books.dto";

// import PrismaService
import { PrismaService } from "@/prisma/prisma.service";

// import Book Model
import { Book } from "@prisma/client";

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryBookDto): Promise<Book[] | null> {
    const books: Book[] = await this.prisma.book.findMany({
      where: {
        title: {
          contains: query.search,
        },
      },
      skip: query.page,
      take: query.limit,
      orderBy: {
        [query.sortBy]: query.sortOrder,
      },
    });
    return books;
  }

  async findOne(id: string): Promise<Book | null> {
    const book: Book | null = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    return book;
  }

  async create(book: CreateBookDto): Promise<Book> {
    const newBook: Book = await this.prisma.book.create({
      data: book,
    });
    return newBook;
  }

  async update(id: string, book: UpdateBookDto): Promise<Book> {
    const updatedBook: Book = await this.prisma.book.update({
      where: {
        id,
      },
      data: book,
    });
    return updatedBook;
  }

  async remove(id: string): Promise<Book> {
    const deletedBook: Book = await this.prisma.book.delete({
      where: {
        id,
      },
    });
    return deletedBook;
  }
}
