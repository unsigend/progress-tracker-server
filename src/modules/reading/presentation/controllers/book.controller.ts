// import dependencies
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Request,
  UploadedFile,
  UseInterceptors,
  Put,
  Delete,
} from "@nestjs/common";
import { type Request as ExpressRequest } from "express";
import { FindAllBooksUseCase } from "../../application/use-case/book/find-all.use-case";
import { BookQueryRequestDto } from "../dtos/book/query.request.dto";
import { BookResponseDto } from "../dtos/book/book.response.dto";
import { BookMapper } from "../../infrastructure/mapper/book.mapper";
import { FindBookIdUseCase } from "../../application/use-case/book/find-id.use-case";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { FileInterceptor } from "@nestjs/platform-express";
import { BookCreateRequestDto } from "../dtos/book/create.request.dto";
import { CreateBookUseCase } from "../../application/use-case/book/create.use-case";
import { PagesValueObject } from "../../domain/object-value/pages.vo";
import { ISBNValueObject } from "../../domain/object-value/isbn.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { BookEntity } from "../../domain/entities/book.entity";
import { BookUpdateRequestDto } from "../dtos/book/update.request.dto";
import { UpdateBookUseCase } from "../../application/use-case/book/update.use-case";
import { DeleteBookUseCase } from "../../application/use-case/book/delete.use-case";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { ApiStandardResponse } from "@/shared/platforms/decorators/api-response.decorator";
import { BooksResponseDto } from "../dtos/book/books.response.dto";
import { RandomBookRequestDto } from "../dtos/book/random.request.dto";
import { FindRandomBooksUseCase } from "../../application/use-case/book/find-random.use-case";

/**
 * Book controller
 * @description Book controller which is used to handle the book requests
 */
@Controller("book")
export class BookController {
  /**
   * Constructor for BookController
   * @param findAllBooksUseCase - The find all books use case
   * @param findBookByIdUseCase - The find book by id use case
   * @param createBookUseCase - The create book use case
   * @param updateBookUseCase - The update book use case
   * @param deleteBookUseCase - The delete book use case
   * @param findRandomBooksUseCase - The find random books use case
   */
  constructor(
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
    private readonly findBookByIdUseCase: FindBookIdUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly findRandomBooksUseCase: FindRandomBooksUseCase,
  ) {}

  /**
   * Find all books
   */
  @Get()
  @ApiStandardResponse(BooksResponseDto)
  public async findAll(
    @Query() query: BookQueryRequestDto,
  ): Promise<BooksResponseDto> {
    // find all books
    const { data, totalCount } = await this.findAllBooksUseCase.execute(
      query.field,
      query.value,
      query.limit,
      query.page,
      query.sort,
      query.order,
    );
    // map the books to the book response dtos
    const bookResponseDtos: BookResponseDto[] = data.map((book) =>
      BookMapper.toDto(book),
    );
    // return the books and the total count of the books
    return { books: bookResponseDtos, totalCount };
  }

  /**
   * Find random books
   */
  @Get("random")
  @ApiStandardResponse(BooksResponseDto)
  public async findRandom(
    @Query() query: RandomBookRequestDto,
  ): Promise<BooksResponseDto> {
    // find the random books
    const books: BookEntity[] = await this.findRandomBooksUseCase.execute(
      query.count,
    );
    // map the books to the book response dtos
    const bookResponseDtos: BookResponseDto[] = books.map((book) =>
      BookMapper.toDto(book),
    );
    // return the books and the total count of the books
    return { books: bookResponseDtos, totalCount: books.length };
  }

  /**
   * Create a book
   */
  @Post()
  @UseInterceptors(FileInterceptor("coverImage"))
  public async create(
    @Request() request: ExpressRequest,
    @Body() createBookRequestDto: BookCreateRequestDto,
    @UploadedFile() coverImage: Express.Multer.File,
  ): Promise<BookResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // create the book entity
    const book: BookEntity = await this.createBookUseCase.execute(
      createBookRequestDto.title,
      new PagesValueObject(createBookRequestDto.pages),
      userId,
      createBookRequestDto.author,
      createBookRequestDto.description,
      createBookRequestDto.ISBN10
        ? new ISBNValueObject(createBookRequestDto.ISBN10)
        : null,
      createBookRequestDto.ISBN13
        ? new ISBNValueObject(createBookRequestDto.ISBN13)
        : null,
      coverImage
        ? new ImageValueObject(coverImage.buffer, coverImage.mimetype)
        : null,
    );

    // map the book entity to the book response dto
    return BookMapper.toDto(book);
  }

  /**
   * Find book by id
   */
  @Get(":id")
  public async findById(@Param("id") id: string): Promise<BookResponseDto> {
    const book: BookEntity = await this.findBookByIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
    // map the book entity to the book response dto
    return BookMapper.toDto(book);
  }

  /**
   * Update a book
   */
  @Put(":id")
  @UseInterceptors(FileInterceptor("coverImage"))
  public async update(
    @Param("id") id: string,
    @Body() updateBookRequestDto: BookUpdateRequestDto,
    @UploadedFile() coverImage: Express.Multer.File,
  ): Promise<BookResponseDto> {
    // update the book entity
    const book: BookEntity = await this.updateBookUseCase.execute(
      new ObjectIdValueObject(id),
      updateBookRequestDto.title,
      updateBookRequestDto.pages
        ? new PagesValueObject(updateBookRequestDto.pages)
        : null,
      updateBookRequestDto.author,
      updateBookRequestDto.description,
      updateBookRequestDto.ISBN10
        ? new ISBNValueObject(updateBookRequestDto.ISBN10)
        : null,
      updateBookRequestDto.ISBN13
        ? new ISBNValueObject(updateBookRequestDto.ISBN13)
        : null,
      coverImage
        ? new ImageValueObject(coverImage.buffer, coverImage.mimetype)
        : null,
    );
    return BookMapper.toDto(book);
  }

  /**
   * Delete a book
   */
  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const result: boolean = await this.deleteBookUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: result };
  }
}
