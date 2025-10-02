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
import { ReadingService } from "@/modules/reading/reading.service";

// import dto
import type { Request } from "express";
import { ObjectIdDto } from "@common/dto/object-id.dto";
import { UserBookResponseDto } from "@/modules/reading/dto/user-book-response.dto";
import { UserResponseDto } from "@/modules/user/dto/user-response.dto";
import { UserBooksResponseDto } from "@/modules/reading/dto/user-books-response.dto";
import { QueryTrackedBookDto } from "@/modules/reading/dto/query-tracked-book.dto";

@Controller("user-books")
export class UserBookController {
  constructor(private readonly readingService: ReadingService) {}

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
    const userBook: UserBookResponseDto = await this.readingService.trackBook(
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
  async delete(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ): Promise<UserBookResponseDto> {
    const user_id: string = (req.user as UserResponseDto).id;
    const userBook: UserBookResponseDto = await this.readingService.untrackBook(
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
  async findAll(@Req() req: Request): Promise<UserBooksResponseDto> {
    // get the user id and query
    const user_id: string = (req.user as UserResponseDto).id;
    const query: QueryTrackedBookDto = req.query as QueryTrackedBookDto;

    // get the user books
    const userBooks: UserBooksResponseDto =
      await this.readingService.getTrackedBooks(user_id, query);
    return userBooks;
  }
}
