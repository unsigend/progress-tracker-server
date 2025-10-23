// import dependencies
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

// import dtos
import { BookCreateRequestDto } from "@/presentation/dtos/book/book-create.request.dto";
import { BookQueryRequestDto } from "@/presentation/dtos/book/book-query.request.dto";
import { BookUpdateRequestDto } from "@/presentation/dtos/book/book-update.request.dto";

// import use cases
import { CreateBookUseCase } from "@/application/use-cases/book/create-book.use-case";
import { FindAllBooksUseCase } from "@/application/use-cases/book/find-all-book.use-case";
import { FindBookByIdUseCase } from "@/application/use-cases/book/find-book-id.use-case";
import { UpdateBookUseCase } from "@/application/use-cases/book/update-book.use-case";
import { DeleteBookUseCase } from "@/application/use-cases/book/delete-book.use-case";

// import value objects
import { PageValueObject } from "@/domain/value-objects/book/page.vo";
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";
import { ISBNValueObject } from "@/domain/value-objects/book/isbn.vo";
import { ImageValueObject } from "@/domain/value-objects/common/image.vo";

// import entities
import { BookEntity } from "@/domain/entities/book.entity";
import { BookQuery } from "@/domain/repositories/queries/book.query";

// import mappers
import { BookMapper } from "@/presentation/mappers/book.mapper";

/**
 * Book controller
 * @description Handles book management operations
 */
@ApiTags("books")
@Controller("books")
export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
    private readonly findBookByIdUseCase: FindBookByIdUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
  ) {}

  /**
   * Create a new book
   */
  @Post()
  @UseInterceptors(FileInterceptor("cover"))
  async create(
    @Body() bookCreateRequestDto: BookCreateRequestDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    const book: BookEntity = await this.createBookUseCase.execute(
      bookCreateRequestDto.title,
      new PageValueObject(bookCreateRequestDto.pages),
      new ObjectIdValueObject("fec34fce-36c3-413e-877c-7dff6f4774b3"),
      bookCreateRequestDto.author,
      bookCreateRequestDto.description,
      bookCreateRequestDto.isbn10
        ? new ISBNValueObject(bookCreateRequestDto.isbn10)
        : null,
      bookCreateRequestDto.isbn13
        ? new ISBNValueObject(bookCreateRequestDto.isbn13)
        : null,
      cover ? new ImageValueObject(cover.buffer, cover.mimetype) : null,
    );
    return BookMapper.toResponseDto(book);
  }

  /**
   * Find all books
   */
  @Get()
  async findAll(@Query() bookQueryRequestDto: BookQueryRequestDto) {
    const { books, totalCount } = await this.findAllBooksUseCase.execute(
      new BookQuery(
        bookQueryRequestDto.key,
        bookQueryRequestDto.value,
        bookQueryRequestDto.sort,
        bookQueryRequestDto.order,
        bookQueryRequestDto.limit,
        bookQueryRequestDto.page,
      ),
    );
    return {
      books: books.map((book) => BookMapper.toResponseDto(book)),
      totalCount,
    };
  }

  /**
   * update a book
   */
  @Patch(":id")
  @UseInterceptors(FileInterceptor("cover"))
  async update(
    @Param("id") id: string,
    @Body() bookUpdateRequestDto: BookUpdateRequestDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    const book: BookEntity = await this.updateBookUseCase.execute(
      new ObjectIdValueObject(id),
      bookUpdateRequestDto.title ?? null,
      bookUpdateRequestDto.pages
        ? new PageValueObject(bookUpdateRequestDto.pages)
        : null,
      bookUpdateRequestDto.author ?? null,
      bookUpdateRequestDto.description ?? null,
      bookUpdateRequestDto.isbn10
        ? new ISBNValueObject(bookUpdateRequestDto.isbn10)
        : null,
      bookUpdateRequestDto.isbn13
        ? new ISBNValueObject(bookUpdateRequestDto.isbn13)
        : null,
      cover ? new ImageValueObject(cover.buffer, cover.mimetype) : null,
    );
    return BookMapper.toResponseDto(book);
  }

  /**
   * Find a book by id
   */
  @Get(":id")
  async findById(@Param("id") id: string) {
    const book: BookEntity = await this.findBookByIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return BookMapper.toResponseDto(book);
  }

  /**
   * Delete a book by id
   */
  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.deleteBookUseCase.execute(new ObjectIdValueObject(id));
    return { success: true };
  }
}
