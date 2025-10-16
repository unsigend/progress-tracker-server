// import dependencies
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Patch,
  NotFoundException,
  Res,
  UseInterceptors,
  UploadedFile,
  Logger,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConsumes,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response, Request } from "express";
import { Public } from "@common/decorators/public.decorator";

// import pipes
import { ParseUUIDPipe } from "@nestjs/common";
// import services
import { BookService } from "@modules/book/book.service";
// import dto
import { BookCreateDto } from "@modules/book/dto/book-create.dto";
import { BookResponseDto } from "@modules/book/dto/book-response.dto";
import { BookUpdateDto } from "@modules/book/dto/book-update.dto";
import { BookQueryDto } from "@modules/book/dto/book-query.dto";
import { BooksResponseDto } from "@modules/book/dto/books-response.dto";
import { Book } from "@prisma/client";
import { UserResponseDto } from "../user/dto/user-response.dto";

@Controller("books")
@ApiTags("Books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Create a book
   * @route POST api/v1/books
   * @param createBookDto - The data to create the book
   * @param cover - The cover image file
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Create a book" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: BookCreateDto })
  @ApiCreatedResponse({
    type: BookResponseDto,
    description: "The book created successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not created",
  })
  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor("cover", {
      limits: {
        fileSize: 1 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          Logger.log("File type mismatch with : ", file.mimetype);
          return callback(new Error("Only image files are allowed!"), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Req() req: Request,
    @Body() createBookDto: BookCreateDto,
    @UploadedFile() cover?: Express.Multer.File,
  ): Promise<BookResponseDto> {
    // get the user id from the request
    const user_id: string = (req.user as UserResponseDto).id;

    // Attach the file to the DTO if it exists
    if (cover) {
      createBookDto.cover = cover;
    }

    const book: Book | null = await this.bookService.create(
      createBookDto,
      user_id,
    );
    return book as BookResponseDto;
  }

  /**
   * Get a book by id
   * @route GET api/v1/books/:id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Get a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not found",
  })
  @Get(":id")
  async findByID(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.findByID(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }
    return book as BookResponseDto;
  }

  /**
   * Update a book by id
   * @route PUT api/v1/books/:id
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Update a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: BookUpdateDto })
  @ApiConsumes("multipart/form-data")
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not updated",
  })
  @Put(":id")
  @UseInterceptors(
    FileInterceptor("cover", {
      limits: {
        fileSize: 1 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error("Only image files are allowed!"), false);
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBookDto: BookUpdateDto,
    @UploadedFile() cover?: Express.Multer.File,
  ): Promise<BookResponseDto> {
    // Attach the file to the DTO if it exists
    if (cover) {
      updateBookDto.cover = cover;
    }

    const book: Book | null = await this.bookService.update(id, updateBookDto);
    return book as BookResponseDto;
  }

  /**
   * Patch a book by id
   * @route PATCH api/v1/books/:id
   * @param id - The id of the book
   * @param updateBookDto - The data to update the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Patch a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: BookUpdateDto })
  @ApiConsumes("multipart/form-data")
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book patched successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not patched",
  })
  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("cover", {
      limits: {
        fileSize: 1 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error("Only image files are allowed!"), false);
        }
        callback(null, true);
      },
    }),
  )
  async patch(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBookDto: BookUpdateDto,
    @UploadedFile() cover?: Express.Multer.File,
  ): Promise<BookResponseDto> {
    // Attach the file to the DTO if it exists
    if (cover) {
      updateBookDto.cover = cover;
    }

    const book: Book | null = await this.bookService.update(id, updateBookDto);
    return book as BookResponseDto;
  }

  /**
   * Delete a book by id
   * @route DELETE api/v1/books/:id
   * @param id - The id of the book
   * @returns The book or null if the book is not found
   */
  @ApiOperation({ summary: "Delete a book by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: BookResponseDto,
    description: "The book deleted successfully",
  })
  @ApiBadRequestResponse({
    description: "Book not deleted",
  })
  @Delete(":id")
  async deleteByID(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<BookResponseDto> {
    const book: Book | null = await this.bookService.delete(id);
    return book as BookResponseDto;
  }

  /**
   * Get all books
   * @route GET api/v1/books
   * @param queryBookDto - The query parameters
   * @note set header x-total-count to the total number of books
   * @returns the books and the total number of books
   */
  @ApiOperation({ summary: "Get all books and set header x-total-count" })
  @ApiOkResponse({
    type: BooksResponseDto,
    description: "The books retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "Books not found",
  })
  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() queryBookDto: BookQueryDto,
  ): Promise<BooksResponseDto> {
    // get books
    const books: BooksResponseDto =
      await this.bookService.findAll(queryBookDto);
    // set header x-total-count
    res.setHeader("x-total-count", books.totalCount.toString());
    return books;
  }
}
