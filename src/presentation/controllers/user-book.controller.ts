// import dependencies
import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Delete,
} from "@nestjs/common";

// import use cases
import { CreateRecordingUseCase } from "@/application/use-cases/reading-recording/create-recording.use-case";
import { FindAllUserBookUseCase } from "@/application/use-cases/user-book/find-all-user-book.use-case";
import { FindUserBookByIdUseCase } from "@application/use-cases/user-book/find-user-book-id.use-case";
import { CreateUserBookUseCase } from "@application/use-cases/user-book/create-user-book.use-case";
import { DeleteUserBookUseCase } from "@application/use-cases/user-book/delete-user-book.use-case";
import { FindAllReadingRecordingsUseCase } from "@application/use-cases/reading-recording/find-all-recording.use-case";
import { DeleteReadingRecordingUserBookIdUseCase } from "@application/use-cases/reading-recording/delete-recording-userBook-id.use-case";

// import dtos
import { UserBookQueryRequestDto } from "@/presentation/dtos/user-book/user-book-query.request.dto";
import { UserBookResponseDto } from "@presentation/dtos/user-book/user-book.response.dto";
import { UserBookCreateRequestDto } from "@presentation/dtos/user-book/user-book-create.request.dto";
import { ReadingRecordingResponseDto } from "@presentation/dtos/reading-recording/reading-recording.response.dto";
import { ReadingRecordingCreateRequestDto } from "@presentation/dtos/reading-recording/reading-recording-create.request.dto";
import { ReadingRecordingQueryRequestDto } from "@presentation/dtos/reading-recording/reading-recording-query.request.dto";

// import mappers
import { UserBookMapper } from "@presentation/mappers/user-book.mapper";
import { ReadingRecordingMapper } from "@presentation/mappers/reading-recording.mapper";

// import queries
import { UserBookQuery } from "@domain/repositories/queries/user-book.query";
import { ReadingRecordingQuery } from "@domain/repositories/queries/reading-recording.query";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

// import entities
import { UserBookEntity } from "@domain/entities/user-book.entity";

/**
 * User book controller
 * @description User book controller
 */
@Controller("user-books")
export class UserBookController {
  constructor(
    private readonly createRecordingUseCase: CreateRecordingUseCase,
    private readonly findAllUserBookUseCase: FindAllUserBookUseCase,
    private readonly findUserBookByIdUseCase: FindUserBookByIdUseCase,
    private readonly createUserBookUseCase: CreateUserBookUseCase,
    private readonly deleteUserBookUseCase: DeleteUserBookUseCase,
    private readonly findReadingRecordingsUseCase: FindAllReadingRecordingsUseCase,
    private readonly deleteReadingRecordingsUseCase: DeleteReadingRecordingUserBookIdUseCase,
  ) {}

  /**
   * Find all user books
   */
  @Get()
  async findAll(
    @Query() userBookQueryRequestDto: UserBookQueryRequestDto,
  ): Promise<{ userBooks: UserBookResponseDto[]; totalCount: number }> {
    // build the query object
    const queryObject: UserBookQuery = new UserBookQuery(
      // TODO: get the user id from the request
      new ObjectIdValueObject("8403a368-41ad-47da-8ba5-c194d5dfd9a4"),
      userBookQueryRequestDto.bookId
        ? new ObjectIdValueObject(userBookQueryRequestDto.bookId)
        : null,
      userBookQueryRequestDto.key ?? null,
      userBookQueryRequestDto.value ?? null,
      userBookQueryRequestDto.sort ?? null,
      userBookQueryRequestDto.order ?? null,
      userBookQueryRequestDto.limit ?? null,
      userBookQueryRequestDto.page ?? null,
    );
    // find the user books
    const { userBooks, totalCount } =
      await this.findAllUserBookUseCase.execute(queryObject);
    return {
      userBooks: userBooks.map((userBook) =>
        UserBookMapper.toResponseDto(userBook),
      ),
      totalCount,
    };
  }

  /**
   * Create a user book
   */
  @Post()
  async create(
    @Body() userBookCreateRequestDto: UserBookCreateRequestDto,
  ): Promise<UserBookResponseDto> {
    const userId: ObjectIdValueObject = new ObjectIdValueObject(
      // TODO: get the user id from the request
      "8403a368-41ad-47da-8ba5-c194d5dfd9a4",
    );
    const bookId: ObjectIdValueObject = new ObjectIdValueObject(
      userBookCreateRequestDto.bookId,
    );
    const userBook: UserBookEntity = await this.createUserBookUseCase.execute(
      userId,
      bookId,
    );
    return UserBookMapper.toResponseDto(userBook);
  }

  /**
   * Find a user book by id
   */
  @Get(":id")
  async findById(@Param("id") id: string): Promise<UserBookResponseDto> {
    const userBook: UserBookEntity = await this.findUserBookByIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return UserBookMapper.toResponseDto(userBook);
  }

  /**
   * Delete a user book by id
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    await this.deleteUserBookUseCase.execute(new ObjectIdValueObject(id));
    return { success: true };
  }

  /**
   * Create a recording for a user book
   */
  @Post(":id/recordings")
  async createRecording(
    @Param("id") id: string,
    @Body() readingRecordingCreateRequestDto: ReadingRecordingCreateRequestDto,
  ): Promise<{ success: boolean }> {
    await this.createRecordingUseCase.execute(
      new ObjectIdValueObject(id),
      new Date(readingRecordingCreateRequestDto.date),
      new PageValueObject(readingRecordingCreateRequestDto.pages),
      new MinuteValueObject(readingRecordingCreateRequestDto.minutes),
      readingRecordingCreateRequestDto.notes,
    );
    return { success: true };
  }

  /**
   * Find recordings by user book id
   */
  @Get(":id/recordings")
  async findRecordings(
    @Param("id") id: string,
    @Query() readingRecordingQueryRequestDto: ReadingRecordingQueryRequestDto,
  ): Promise<{
    readingRecordings: ReadingRecordingResponseDto[];
    totalCount: number;
  }> {
    // build the query object
    const queryObject: ReadingRecordingQuery = new ReadingRecordingQuery(
      new ObjectIdValueObject(id),
      readingRecordingQueryRequestDto.date ?? null,
      readingRecordingQueryRequestDto.sort ?? null,
      readingRecordingQueryRequestDto.order ?? null,
      readingRecordingQueryRequestDto.limit ?? null,
      readingRecordingQueryRequestDto.page ?? null,
    );
    // find the reading recordings
    const { readingRecordings, totalCount } =
      await this.findReadingRecordingsUseCase.execute(queryObject);
    return {
      readingRecordings: readingRecordings.map((readingRecording) =>
        ReadingRecordingMapper.toResponseDto(readingRecording),
      ),
      totalCount,
    };
  }

  /**
   * Delete recordings by user book id
   */
  @Delete(":id/recordings")
  async deleteRecordings(
    @Param("id") id: string,
  ): Promise<{ success: boolean }> {
    await this.deleteReadingRecordingsUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: true };
  }
}
