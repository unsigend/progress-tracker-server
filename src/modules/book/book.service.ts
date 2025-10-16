// import dependencies
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@modules/database/prisma.service";
import { Prisma, Book } from "@prisma/client";

// import dto
import { BookCreateDto } from "@modules/book/dto/book-create.dto";
import { BookUpdateDto } from "@modules/book/dto/book-update.dto";
import { BookQueryDto } from "@modules/book/dto/book-query.dto";
import { BooksResponseDto } from "@modules/book/dto/books-response.dto";

// import services
import { ImagesService } from "@modules/images/images.service";
import { S3Service } from "@modules/S3/S3.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BookService {
  private readonly AWS_S3_PREFIX: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly imagesService: ImagesService,
    private readonly s3Service: S3Service,
  ) {
    const AWS_BUCKET_NAME: string = this.configService.get(
      "s3.AWS_S3_BUCKET_NAME",
    )!;
    const AWS_REGION: string = this.configService.get("s3.AWS_S3_REGION")!;
    this.AWS_S3_PREFIX = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/`;
  }

  /**
   * Find a book by a unique key
   * @param where - The unique key to find the book
   * @returns The book or null if the book is not found
   * @private
   */
  private async findBy(
    where: Prisma.BookWhereUniqueInput,
  ): Promise<Book | null> {
    const book: Book | null = await this.prisma.book.findUnique({
      where,
    });

    return book;
  }

  /**
   * Find a book by id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  public async findByID(id: string): Promise<Book | null> {
    const book: Book | null = await this.findBy({ id });
    return book;
  }

  /**
   * Create a book
   * @param createBookDto - The data to create the book
   * @param userId - The id of the user who created the book
   * @returns The book or null if the book is not found
   */
  public async create(
    bookCreateDto: BookCreateDto,
    userId: string,
  ): Promise<Book | null> {
    try {
      // if the cover image file is provided
      if (bookCreateDto.cover) {
        // compress the cover image
        const compressedImage: Buffer = await this.imagesService.compressImage(
          bookCreateDto.cover.buffer,
          {
            quality: 80,
            width: 800,
            height: 800,
            format: bookCreateDto.cover.mimetype.split("/")[1] as
              | "jpeg"
              | "png"
              | "webp",
          },
        );

        // upload the cover image to AWS S3
        bookCreateDto.cover_url = await this.s3Service.upload(
          compressedImage,
          bookCreateDto.cover.mimetype,
          "book-cover",
        );
      }
      // create the book
      const bookData = { ...bookCreateDto };
      delete bookData.cover;

      const book: Book | null = await this.prisma.book.create({
        data: { ...bookData, createdById: userId },
      });

      return book;
    } catch {
      throw new BadRequestException("Failed to create book");
    }
  }

  /**
   * Update a book
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  public async update(
    id: string,
    bookUpdateDto: BookUpdateDto,
  ): Promise<Book | null> {
    try {
      // if the cover image file is provided
      if (bookUpdateDto.cover) {
        // compress the cover image
        const compressedImage: Buffer = await this.imagesService.compressImage(
          bookUpdateDto.cover.buffer,
          {
            quality: 80,
            width: 800,
            height: 800,
            format: bookUpdateDto.cover.mimetype.split("/")[1] as
              | "jpeg"
              | "png"
              | "webp",
          },
        );
        // upload the cover image to AWS S3
        bookUpdateDto.cover_url = await this.s3Service.upload(
          compressedImage,
          bookUpdateDto.cover.mimetype,
          "book-cover",
        );

        // get the old book
        const oldBook: Book | null = await this.findByID(id);
        if (!oldBook) {
          throw new NotFoundException("Book not found");
        }

        // if the old cover image url is in AWS S3
        if (
          oldBook.cover_url &&
          oldBook.cover_url.startsWith(this.AWS_S3_PREFIX)
        ) {
          // delete the old AWS S3 cover image
          await this.s3Service.delete(oldBook.cover_url);
        }
      }
      // update the book
      const bookData = { ...bookUpdateDto };
      // exclude the cover file from the data
      delete bookData.cover;
      const book: Book | null = await this.prisma.book.update({
        where: { id },
        data: { ...bookData, updatedAt: new Date() },
      });

      return book;
    } catch {
      throw new BadRequestException("Failed to update book");
    }
  }

  /**
   * Delete a book
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  public async delete(id: string): Promise<Book | null> {
    try {
      // get the book
      const oldBook: Book | null = await this.findByID(id);
      if (!oldBook) {
        throw new NotFoundException("Book not found");
      }

      // if the cover image url is in AWS S3
      if (
        oldBook.cover_url &&
        oldBook.cover_url.startsWith(this.AWS_S3_PREFIX)
      ) {
        // delete the AWS S3 cover image
        await this.s3Service.delete(oldBook.cover_url);
      }

      const book: Book | null = await this.prisma.book.delete({
        where: { id },
      });

      return book;
    } catch {
      throw new BadRequestException("Failed to delete book");
    }
  }

  /**
   * Find all books
   * @param queryBookDto - The query parameters
   * @returns The books or null if the books are not found
   */
  public async findAll(queryBookDto: BookQueryDto): Promise<BooksResponseDto> {
    // set default values
    if (!queryBookDto.page) {
      queryBookDto.page = 1;
    }
    if (!queryBookDto.limit) {
      queryBookDto.limit = 10;
    }
    if (!queryBookDto.sort) {
      queryBookDto.sort = "createdAt";
    }
    if (!queryBookDto.order) {
      queryBookDto.order = "desc";
    }

    const books: Book[] = await this.prisma.book.findMany({
      where: queryBookDto.value
        ? {
            OR: [
              { title: { contains: queryBookDto.value, mode: "insensitive" } },
              {
                author: { contains: queryBookDto.value, mode: "insensitive" },
              },
              {
                ISBN10: { contains: queryBookDto.value, mode: "insensitive" },
              },
              {
                ISBN13: { contains: queryBookDto.value, mode: "insensitive" },
              },
            ],
          }
        : {},
      skip: (queryBookDto.page - 1) * queryBookDto.limit,
      take: queryBookDto.limit,
      orderBy: {
        [queryBookDto.sort]: queryBookDto.order,
      },
    });

    if (!queryBookDto.value) {
      const totalCount: number = await this.getTotalCount();
      return {
        books,
        totalCount,
      };
    }

    return {
      books,
      totalCount: books.length,
    };
  }

  /**
   * Get the total number of books
   * @returns The total number of books
   */
  public async getTotalCount(): Promise<number> {
    const totalCount: number = await this.prisma.book.count();
    return totalCount;
  }
}
