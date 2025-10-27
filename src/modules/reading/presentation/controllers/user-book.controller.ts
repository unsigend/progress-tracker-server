// import dependencies
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
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
import { CreateRecordingRequestDto } from "../dtos/recording/create.request.dto";
import { PagesValueObject } from "../../domain/object-value/pages.vo";
import { MinutesValueObject } from "../../domain/object-value/minutes.vo";
import { RecordingEntity } from "../../domain/entities/recording.entity";
import { CreateRecordingUseCase } from "../../application/use-case/recording/create.use-case";
import { DeleteRecordingsUseCase } from "../../application/use-case/recording/delete.use-case";
import { type Request as ExpressRequest } from "express";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
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
    private readonly createRecordingUseCase: CreateRecordingUseCase,
    private readonly deleteRecordingsUseCase: DeleteRecordingsUseCase,
  ) {}

  /**
   * Find all user books
   */
  @Get()
  public async findAll(
    @Request() request: ExpressRequest,
    @Query() userBookQueryRequestDto: UserBookQueryRequestDto,
  ): Promise<{ data: UserBookResponseDto[]; totalCount: number }> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    const { data, totalCount } = await this.findAllUserBooksUseCase.execute(
      userId,
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
   * Create a user book
   */
  @Post()
  public async create(
    @Request() request: ExpressRequest,
    @Body() createUserBookRequestDto: CreateUserBookRequestDto,
  ): Promise<UserBookResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    const userBook: UserBookEntity = await this.createUserBookUseCase.execute(
      new ObjectIdValueObject(createUserBookRequestDto.bookId),
      userId,
    );
    return UserBookMapper.toDtoUserBook(userBook);
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
  public async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const result: boolean = await this.deleteUserBookUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: result };
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

  /**
   * Create a recording
   */
  @Post(":id/recordings")
  public async createRecording(
    @Param("id") id: string,
    @Body() createRecordingRequestDto: CreateRecordingRequestDto,
  ): Promise<RecordingResponseDto> {
    const recording: RecordingEntity =
      await this.createRecordingUseCase.execute(
        new ObjectIdValueObject(id),
        createRecordingRequestDto.date,
        new PagesValueObject(createRecordingRequestDto.pages),
        new MinutesValueObject(createRecordingRequestDto.minutes),
        createRecordingRequestDto.notes ?? null,
      );

    return RecordingMapper.toDto(recording);
  }

  /**
   * Delete recordings
   */
  @Delete(":id/recordings")
  public async deleteRecordings(
    @Param("id") id: string,
  ): Promise<{ success: boolean }> {
    const result: boolean = await this.deleteRecordingsUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: result };
  }
}
