// import dependencies
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

// import services
import { PrismaService } from "@modules/database/prisma.service";
import { UserService } from "@modules/user/user.service";
import { BookService } from "@modules/book/book.service";

// import dto
import { UserBook, Book } from "@prisma/client";
import { UserBookResponseDto } from "@modules/reading/dto/user-book-response.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { QueryTrackedBookDto } from "@modules/reading/dto/query-tracked-book.dto";
import { UserBooksResponseDto } from "@modules/reading/dto/user-books-response.dto";

@Injectable()
export class ReadingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  /**
   * Track a book for a user
   * @param book_id - The book id
   * @param user_id - The user id
   * @returns The user book
   * @public
   */
  async trackBook(
    book_id: string,
    user_id: string,
  ): Promise<UserBookResponseDto> {
    const user: UserResponseDto = (await this.userService.findByID(
      user_id,
      false,
    )) as UserResponseDto;

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const book: Book = (await this.bookService.findByID(book_id)) as Book;

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    // check if the user has already tracked the book

    // composite unique key
    const compositeUniqueKey = { book_id, user_id };
    const userBook: UserBook | null = await this.prisma.userBook.findUnique({
      where: { book_id_user_id: compositeUniqueKey },
    });

    if (userBook) {
      throw new BadRequestException("You have already tracked this book");
    }

    const newUserBook: UserBook = await this.prisma.userBook.create({
      data: { user_id, book_id },
    });

    return newUserBook as UserBookResponseDto;
  }

  /**
   * Untrack a book for a user
   * @param book_id - The book id
   * @param user_id - The user id
   * @returns The user book
   * @public
   */
  async untrackBook(
    book_id: string,
    user_id: string,
  ): Promise<UserBookResponseDto> {
    const compositeUniqueKey = { book_id, user_id };
    const userBook: UserBook | null = await this.prisma.userBook.findUnique({
      where: { book_id_user_id: compositeUniqueKey },
    });

    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // check if the user is the owner of the user book
    if (userBook.user_id !== user_id || userBook.book_id !== book_id) {
      throw new ForbiddenException("Permission denied");
    }

    await this.prisma.userBook.delete({
      where: { book_id_user_id: compositeUniqueKey },
    });

    return userBook as UserBookResponseDto;
  }

  /**
   * Get tracked books for a user
   * @param user_id - The user id
   * @param query - The query
   * @returns The user books
   * @public
   */
  async getTrackedBooks(
    user_id: string,
    query: QueryTrackedBookDto,
  ): Promise<UserBooksResponseDto> {
    // check if the user exists
    const user: UserResponseDto = (await this.userService.findByID(
      user_id,
      false,
    )) as UserResponseDto;

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!query.status) {
      // if no status is provided, return all user books
      const userBooks: UserBook[] = await this.prisma.userBook.findMany({
        where: { user_id },
      });
      return {
        userBooks: userBooks as UserBookResponseDto[],
        totalCount: userBooks.length,
      };
    }

    const userBooks: UserBook[] = await this.prisma.userBook.findMany({
      where: { user_id, status: query.status },
    });
    return {
      userBooks: userBooks as UserBookResponseDto[],
      totalCount: userBooks.length,
    };
  }
}
