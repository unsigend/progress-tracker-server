/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { UserBook, Book, ReadingStatus } from "@prisma/client";
import { UserBookResponseDto } from "@/modules/reading/userBook/dto/user-book-response.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { QueryTrackedBookDto } from "@/modules/reading/userBook/dto/query-tracked-book.dto";
import { UserBooksResponseDto } from "@/modules/reading/userBook/dto/user-books-response.dto";
import { BookProgressDto } from "@/modules/reading/userBook/dto/book-progress.dto";
import { UserBookUpdateDto } from "@/modules/reading/userBook/dto/user-book-update.dto";

@Injectable()
export class UserBookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  /**
   * Find a user book by id
   * @param id - The id of the user book
   * @returns The user book or null if the user book is not found
   * @public
   */
  async findById(id: string): Promise<UserBookResponseDto> {
    const userBook: UserBookResponseDto =
      (await this.prisma.userBook.findUnique({
        where: { id },
      })) as UserBookResponseDto;
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }
    return userBook;
  }

  /**
   * Update a user book
   * @param id - The id of the user book
   * @param data - The data to update the user book
   * @returns The user book
   * @public
   */
  async update(
    id: string,
    data: UserBookUpdateDto,
  ): Promise<UserBookResponseDto> {
    // get the user book
    const userBook: UserBookResponseDto | null = await this.findById(id);
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // get the book
    const book: Book | null = await this.bookService.findByID(userBook.book_id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    let updatedUserBookData: UserBookResponseDto | null = null;

    if (data.pages + userBook.current_page >= book.pages) {
      // if the book is completed after the update
      updatedUserBookData = {
        ...userBook,
        status: ReadingStatus.COMPLETED,
        completed_date: new Date(),
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: book.pages,
        updatedAt: new Date(),
      };
    } else if (userBook.start_date === null) {
      // if the book is the first time being tracked
      updatedUserBookData = {
        ...userBook,
        start_date: new Date(),
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: userBook.current_page + data.pages,
        updatedAt: new Date(),
      };
    } else if (
      userBook.current_page + data.pages <= 0 ||
      userBook.total_minutes + data.minutes <= 0 ||
      userBook.total_days + data.days <= 0
    ) {
      // if after the update the book will has no recording
      updatedUserBookData = {
        ...userBook,
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: userBook.current_page + data.pages,
        start_date: null,
        updatedAt: new Date(),
      };
    } else {
      // if the book is already being tracked and normal update
      updatedUserBookData = {
        ...userBook,
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: userBook.current_page + data.pages,
        updatedAt: new Date(),
      };
    }

    // update the user book
    const updatedUserBook: UserBookResponseDto =
      (await this.prisma.userBook.update({
        where: { id },
        data: updatedUserBookData,
      })) as UserBookResponseDto;

    return updatedUserBook;
  }

  /**
   * Track a book for a user
   * @param book_id - The book id
   * @param user_id - The user id
   * @returns The user book
   * @public
   */
  async create(book_id: string, user_id: string): Promise<UserBookResponseDto> {
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

    // create the user book
    const newUserBook: UserBook = await this.prisma.userBook.create({
      data: {
        user_id,
        book_id,
        status: ReadingStatus.IN_PROGRESS,
      },
    });

    return newUserBook as UserBookResponseDto;
  }

  /**
   * Untrack a book for a user
   * @param user_book_id - The user book id
   * @param user_id - The user id
   * @returns The user book
   * @public
   */
  async delete(
    user_book_id: string,
    user_id: string,
  ): Promise<UserBookResponseDto> {
    const userBook: UserBook | null = await this.prisma.userBook.findUnique({
      where: { id: user_book_id },
    });

    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    // check if the user is the owner of the user book
    if (userBook.user_id !== user_id) {
      throw new ForbiddenException("Permission denied");
    }

    // delete the user book
    await this.prisma.userBook.delete({
      where: { id: user_book_id },
    });

    return userBook as UserBookResponseDto;
  }

  /**
   * Get all user books for a user
   * @param user_id - The user id
   * @param query - The query
   * @returns The books
   * @public
   */
  async getAll(
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

    // if the value is provided
    if (query.value) {
      // if status is provided, return all user books with the status
      const userBooksWithBooks = await this.prisma.userBook.findMany({
        where: { user_id, status: query.value },
        include: { book: true },
      });

      const books: BookProgressDto[] = userBooksWithBooks.map((userBook) => ({
        book: userBook.book as any,
        userBook: userBook as any,
      }));

      return {
        books,
        totalCount: books.length,
      };
    }

    // if the value is not provided, return all user books
    const userBooksWithBooks = await this.prisma.userBook.findMany({
      where: { user_id },
      include: { book: true },
    });

    const books: BookProgressDto[] = userBooksWithBooks.map((userBook) => ({
      book: userBook.book as any,
      userBook: userBook as any,
    }));

    return {
      books,
      totalCount: books.length,
    };
  }
}
