// import dependencies
import {
  Controller,
  Post,
  Delete,
  Req,
  ParseUUIDPipe,
  Get,
  Param,
  Body,
  Patch,
  Res,
} from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

// import services
import { UserBookService } from "@/modules/reading/userBook/userBook.service";

// import dto
import type { Request, Response } from "express";
import { ObjectIdDto } from "@common/dto/object-id.dto";
import { UserBookResponseDto } from "@/modules/reading/userBook/dto/user-book-response.dto";
import { UserResponseDto } from "@/modules/user/dto/user-response.dto";
import { UserBooksResponseDto } from "@/modules/reading/userBook/dto/user-books-response.dto";
import { QueryTrackedBookDto } from "@/modules/reading/userBook/dto/query-tracked-book.dto";
import { UserBookUpdateDto } from "@/modules/reading/userBook/dto/user-book-update.dto";

@Controller("user-books")
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  /**
   * Track a new book for current user
   * @param id - The book id
   * @returns The user book
   * @public
   */
  @ApiOperation({ summary: "Track a book for current user" })
  @ApiOkResponse({ type: UserBookResponseDto })
  @ApiNotFoundResponse({ description: "Book not found" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBody({ type: ObjectIdDto })
  @Post()
  async create(
    @Body() objectIdDto: ObjectIdDto,
    @Req() req: Request,
  ): Promise<UserBookResponseDto> {
    const user_id: string = (req.user as UserResponseDto).id;
    const userBook: UserBookResponseDto = await this.userBookService.create(
      objectIdDto.id,
      user_id,
    );
    return userBook;
  }

  /**
   * Untrack a book for a user
   * @param id - The book id
   * @returns The user book
   * @public
   */
  @ApiOperation({ summary: "Untrack a book for current user" })
  @ApiOkResponse({ type: UserBookResponseDto })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiNotFoundResponse({ description: "User book not found" })
  @ApiForbiddenResponse({ description: "Permission denied" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Delete(":id")
  async deleteByID(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ): Promise<UserBookResponseDto> {
    const user_id: string = (req.user as UserResponseDto).id;
    const userBook: UserBookResponseDto = await this.userBookService.delete(
      id,
      user_id,
    );
    return userBook;
  }

  /**
   * Get tracked books for a user
   * @param user_id - The user id
   * @param query - The query
   * @returns The user books
   * @public
   */
  @ApiOperation({ summary: "Get all tracked books for a user" })
  @ApiOkResponse({ type: UserBooksResponseDto })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiQuery({ type: QueryTrackedBookDto })
  @Get()
  async findAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserBooksResponseDto> {
    // get the user id and query
    const user_id: string = (req.user as UserResponseDto).id;
    const query: QueryTrackedBookDto = req.query as QueryTrackedBookDto;

    // get the user books
    const userBooks: UserBooksResponseDto = await this.userBookService.getAll(
      user_id,
      query,
    );
    // set header x-total-count
    res.setHeader("x-total-count", userBooks.totalCount.toString());
    return userBooks;
  }

  /**
   * Get a user book by id
   * @param id - The user book id
   * @returns The user book
   * @public
   */
  @ApiOperation({ summary: "Get a user book by id" })
  @ApiOkResponse({ type: UserBookResponseDto })
  @ApiNotFoundResponse({ description: "User book not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get(":id")
  async findById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<UserBookResponseDto> {
    const userBook: UserBookResponseDto =
      await this.userBookService.findById(id);
    return userBook;
  }

  /**
   * Update a user book
   * @param id - The user book id
   * @param data - The data to update the user book
   * @returns The user book
   * @public
   */
  @ApiOperation({ summary: "Update a user book" })
  @ApiOkResponse({ type: UserBookResponseDto })
  @ApiNotFoundResponse({ description: "User book not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBody({ type: UserBookUpdateDto })
  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UserBookUpdateDto,
  ): Promise<UserBookResponseDto> {
    const userBook: UserBookResponseDto = await this.userBookService.update(
      id,
      data,
    );
    return userBook;
  }
}
