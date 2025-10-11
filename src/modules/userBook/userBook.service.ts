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
import { UserBook, Book, ReadingStatus, ReadingRecord } from "@prisma/client";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { UserBookResponseDto } from "@modules/userBook/dto/user-book-response.dto";
import { UserBookUpdateDto } from "@modules/userBook/dto/user-book-update.dto";
import { UserBookQueryDto } from "@modules/userBook/dto/user-book-query.dto";
import { UserBooksResponseDto } from "@modules/userBook/dto/user-books-response.dto";
import { BookResponseDto } from "@modules/book/dto/book-response.dto";
import { RecordingCreateDto } from "@modules/userBook/dto/recording-create.dto";
import { RecordingResponseDto } from "@modules/userBook/dto/recording-response.dto";

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

    // if the book is completed after the update
    if (data.pages + userBook.current_page >= book.pages) {
      updatedUserBookData = {
        ...userBook,
        status: ReadingStatus.COMPLETED,
        completed_date: data.date ?? new Date(),
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: book.pages,
        updatedAt: new Date(),
      };
    }
    // if the book is the first time being tracked
    else if (userBook.start_date === null) {
      updatedUserBookData = {
        ...userBook,
        start_date: data.date ?? new Date(),
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: userBook.current_page + data.pages,
        updatedAt: new Date(),
      };
    }
    // if the book is already being tracked and normal update
    else {
      let earliestDate = userBook.start_date;
      if (data.date && data.date < userBook.start_date) {
        earliestDate = data.date;
      }
      updatedUserBookData = {
        ...userBook,
        total_minutes: userBook.total_minutes + data.minutes,
        total_days: userBook.total_days + data.days,
        current_page: userBook.current_page + data.pages,
        start_date: earliestDate,
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
    query: UserBookQueryDto,
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

      const books = userBooksWithBooks.map((userBook) => ({
        book: userBook.book as BookResponseDto,
        userBook: userBook as UserBookResponseDto,
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

    const books = userBooksWithBooks.map((userBook) => ({
      book: userBook.book as any,
      userBook: userBook as any,
    }));

    return {
      books,
      totalCount: books.length,
    };
  }

  /**
   * Create a recording for a user book
   * @param user_book_id - The user book id
   * @param data - The data to create the recording
   * @returns The recording
   * @public
   */
  async createRecording(
    user_book_id: string,
    data: RecordingCreateDto,
  ): Promise<RecordingResponseDto> {
    const userBook: UserBook | null = await this.prisma.userBook.findUnique({
      where: { id: user_book_id },
    });
    if (!userBook) {
      throw new NotFoundException("User book not found");
    }

    const book: Book | null = await this.bookService.findByID(userBook.book_id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    const existingRecording: ReadingRecord | null =
      await this.prisma.readingRecord.findUnique({
        where: { user_book_id_date: { user_book_id, date: data.date } },
      });

    let resultRecording: RecordingResponseDto | null = null;
    let realReadPage = 0;

    // if the pages is greater than the remaining pages of the book,
    // set the real read page to the remaining pages of the book
    if (data.pages > book.pages - userBook.current_page) {
      realReadPage = book.pages - userBook.current_page;
    } else {
      realReadPage = data.pages;
    }

    // if the recording exists merge the recording
    if (existingRecording) {
      resultRecording = await this.prisma.readingRecord.update({
        where: { id: existingRecording.id },
        data: {
          pages: existingRecording.pages + realReadPage,
          minutes: existingRecording.minutes + (data.minutes ?? 0),
          notes: data.notes ?? existingRecording.notes,
        },
      });

      await this.update(user_book_id, {
        pages: realReadPage,
        minutes: data.minutes ?? 0,
        days: 0,
        date: data.date,
      } as UserBookUpdateDto);
    }
    // else create a new recording
    else {
      resultRecording = (await this.prisma.readingRecord.create({
        data: {
          ...data,
          user_book_id,
          pages: realReadPage,
        },
      })) as RecordingResponseDto;

      await this.update(user_book_id, {
        pages: realReadPage,
        minutes: data.minutes ?? 0,
        days: 1,
        date: data.date,
      } as UserBookUpdateDto);
    }

    return resultRecording;
  }

  /**
   * Get all recordings for a user book
   * @param user_book_id - The user book id
   * @returns The recordings
   * @public
   */
  async getRecordings(user_book_id: string): Promise<RecordingResponseDto[]> {
    const recordings: ReadingRecord[] =
      await this.prisma.readingRecord.findMany({
        where: { user_book_id },
        orderBy: { date: "asc" },
      });

    return recordings as RecordingResponseDto[];
  }

  /**
   * Delete all recordings for a user book
   * @param user_book_id - The user book id
   * @returns The void
   * @public
   */
  async deleteRecordings(user_book_id: string): Promise<void> {
    await this.prisma.readingRecord.deleteMany({
      where: { user_book_id },
    });
  }
}
