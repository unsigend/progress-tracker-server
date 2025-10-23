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
import { AddRecordingUseCase } from "@/application/use-cases/user-book/add-recording.use-case";
import { FindAllUserBookUseCase } from "@/application/use-cases/user-book/find-all-user-book.use-case";
import { FindUserBookByIdUseCase } from "@application/use-cases/user-book/find-user-book-id.use-case";
import { CreateUserBookUseCase } from "@application/use-cases/user-book/create-user-book.use-case";
import { DeleteUserBookUseCase } from "@application/use-cases/user-book/delete-user-book.use-case";
import { FindReadingRecordingByUserBookIdUseCase } from "@application/use-cases/reading-recording/find-recording-userBook-id.use-case";

// import dtos
import { UserBookQueryRequestDto } from "@/presentation/dtos/user-book/user-book-query.request.dto";
import { UserBookResponseDto } from "@presentation/dtos/user-book/user-book.response.dto";
import { UserBookCreateRequestDto } from "@presentation/dtos/user-book/user-book-create.request.dto";
import { UserBookAddRecordRequestDto } from "@presentation/dtos/user-book/user-book-add-record.request.dto";
import { ReadingRecordingResponseDto } from "@presentation/dtos/reading-recording/reading-recording.response.dto";

// import mappers
import { UserBookMapper } from "@presentation/mappers/user-book.mapper";
import { ReadingRecordingMapper } from "@presentation/mappers/reading-recording.mapper";

// import queries
import { UserBookQuery } from "@domain/repositories/queries/user-book.query";

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
    private readonly addRecordingUseCase: AddRecordingUseCase,
    private readonly findAllUserBookUseCase: FindAllUserBookUseCase,
    private readonly findUserBookByIdUseCase: FindUserBookByIdUseCase,
    private readonly createUserBookUseCase: CreateUserBookUseCase,
    private readonly deleteUserBookUseCase: DeleteUserBookUseCase,
    private readonly findReadingRecordingsUseCase: FindReadingRecordingByUserBookIdUseCase,
  ) {}

  /**
   * Find all user books
   */
  @Get()
  async findAll(
    @Query() userBookQueryRequestDto: UserBookQueryRequestDto,
  ): Promise<{ userBooks: UserBookResponseDto[]; totalCount: number }> {
    const queryObject: UserBookQuery = new UserBookQuery(
      userBookQueryRequestDto.userId
        ? new ObjectIdValueObject(userBookQueryRequestDto.userId)
        : null,
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
      "fec34fce-36c3-413e-877c-7dff6f4774b3",
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
   * Add a recording to a user book
   */
  @Post(":id/recordings")
  async addRecording(
    @Param("id") id: string,
    @Body() userBookAddRecordRequestDto: UserBookAddRecordRequestDto,
  ): Promise<{ success: boolean }> {
    await this.addRecordingUseCase.execute(
      new ObjectIdValueObject(id),
      new Date(userBookAddRecordRequestDto.date),
      new PageValueObject(userBookAddRecordRequestDto.pages),
      new MinuteValueObject(userBookAddRecordRequestDto.minutes),
      userBookAddRecordRequestDto.notes,
    );
    return { success: true };
  }

  /**
   * Find recordings by user book id
   */
  @Get(":id/recordings")
  async findRecordings(@Param("id") id: string): Promise<{
    readingRecordings: ReadingRecordingResponseDto[];
    totalCount: number;
  }> {
    const { readingRecordings, totalCount } =
      await this.findReadingRecordingsUseCase.execute(
        new ObjectIdValueObject(id),
      );
    return {
      readingRecordings: readingRecordings.map((readingRecording) =>
        ReadingRecordingMapper.toResponseDto(readingRecording),
      ),
      totalCount,
    };
  }
}
