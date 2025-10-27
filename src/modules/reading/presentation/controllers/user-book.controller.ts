// import dependencies
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserBookUseCase } from "../../application/use-case/user-book/create.use-case";
import { DeleteUserBookUseCase } from "../../application/use-case/user-book/delete.use-case";
import { CreateUserBookRequestDto } from "../dtos/user-book/create.request.dto";
import { UserBookResponseDto } from "../dtos/user-book/user-book.response.dto";
import { UserBookEntity } from "../../domain/entities/user-book.entity";
import { UserBookMapper } from "../../infrastructure/mapper/user-book.mapper";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserBookQueryRequestDto } from "../dtos/user-book/query.request.dto";
import { FindAllUserBooksUseCase } from "../../application/use-case/user-book/find-all.use-case";
import { FindUserBookIdUseCase } from "../../application/use-case/user-book/find-id.use-case";
import { FindAllRecordingsUseCase } from "../../application/use-case/recording/find-all.use-case";
import { RecordingMapper } from "../../infrastructure/mapper/recording.mapper";
import { RecordingResponseDto } from "../dtos/recording/recording.response.dto";
import { RecordingQueryRequestDto } from "../dtos/recording/query.request.dto";
/**
 * User book controller
 * @description User book controller which is used to handle the user book requests.
 */
@Controller("user-book")
export class UserBookController {
  /**
   * Constructor for UserBookController
   * @param createUserBookUseCase - The create user book use case
   * @param deleteUserBookUseCase - The delete user book use case
   */
  constructor(
    private readonly createUserBookUseCase: CreateUserBookUseCase,
    private readonly deleteUserBookUseCase: DeleteUserBookUseCase,
    private readonly findAllUserBooksUseCase: FindAllUserBooksUseCase,
    private readonly findUserBookIdUseCase: FindUserBookIdUseCase,
    private readonly findAllRecordingsUseCase: FindAllRecordingsUseCase,
  ) {}

  /**
   * Create a user book
   */
  @Post()
  public async create(
    @Body() createUserBookRequestDto: CreateUserBookRequestDto,
  ): Promise<UserBookResponseDto> {
    // TODO: replace with actual user id
    const userId = "327ab385-ae2b-4a11-97cc-d5b631e6e4b4";

    const userBook: UserBookEntity = await this.createUserBookUseCase.execute(
      new ObjectIdValueObject(createUserBookRequestDto.bookId),
      new ObjectIdValueObject(userId),
    );
    return UserBookMapper.toDtoUserBook(userBook);
  }

  /**
   * Find all user books
   */
  @Get()
  public async findAll(
    @Query() userBookQueryRequestDto: UserBookQueryRequestDto,
  ): Promise<{ data: UserBookResponseDto[]; totalCount: number }> {
    // TODO: replace with actual user id
    const userId = "327ab385-ae2b-4a11-97cc-d5b631e6e4b4";

    const { data, totalCount } = await this.findAllUserBooksUseCase.execute(
      new ObjectIdValueObject(userId),
      userBookQueryRequestDto.field,
      userBookQueryRequestDto.value,
      userBookQueryRequestDto.limit,
      userBookQueryRequestDto.page,
      userBookQueryRequestDto.sort,
      userBookQueryRequestDto.order,
    );

    // map the user books to the user book response dtos
    const userBookResponseDtos: UserBookResponseDto[] = data.map((userBook) =>
      UserBookMapper.toDtoUserBook(userBook),
    );

    // return the user books and the total count of the user books
    return { data: userBookResponseDtos, totalCount };
  }

  /**
   * Find a user book by id
   */
  @Get(":id")
  public async findById(@Param("id") id: string): Promise<UserBookResponseDto> {
    const userBook: UserBookEntity = await this.findUserBookIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return UserBookMapper.toDtoUserBook(userBook);
  }

  /**
   * Delete a user book
   */
  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<boolean> {
    return await this.deleteUserBookUseCase.execute(
      new ObjectIdValueObject(id),
    );
  }

  /**
   * Find all recordings
   */
  @Get(":id/recordings")
  public async findRecordings(
    @Param("id") id: string,
    @Query() recordingQueryRequestDto: RecordingQueryRequestDto,
  ): Promise<{ data: RecordingResponseDto[]; totalCount: number }> {
    // get all recordings based on the user book id
    const { data, totalCount } = await this.findAllRecordingsUseCase.execute(
      new ObjectIdValueObject(id),
      recordingQueryRequestDto.limit,
      recordingQueryRequestDto.page,
      recordingQueryRequestDto.sort,
      recordingQueryRequestDto.order,
    );

    // map the recordings to the recording response dtos
    const recordingResponseDtos: RecordingResponseDto[] = data.map(
      (recording) => RecordingMapper.toDto(recording),
    );

    // return the recordings and the total count of the recordings
    return {
      data: recordingResponseDtos,
      totalCount,
    };
  }
}
