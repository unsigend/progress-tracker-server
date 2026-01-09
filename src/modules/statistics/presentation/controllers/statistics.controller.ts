// import use cases
import { ReadingRecordingUseCase } from "../../application/use-case/reading/reading-recording.use-case";

// import dependencies
import { Controller, Get, Body, Request, Param } from "@nestjs/common";
import { type Request as ExpressRequest } from "express";
import { ReadingRecordingRequestDto } from "../dtos/reading/reading-recording.request.dto";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { ReadingRecordingResponseDto } from "../dtos/reading/reading-recording.response.dto";
import { ReadingRecordingDetailResponseDto } from "../dtos/reading/reading-recording-detail.response.dto";
import { ReadingRecordingDetailRequestDto } from "../dtos/reading/reading-recording-detail.request.dto";
import { BookRecordingMapper } from "@/modules/reading/infrastructure/mapper/recording.mapper";
import { ReadingRecordingDetailUseCase } from "../../application/use-case/reading/reading-recording-detail.use-case";
import { CourseRecordingDetailUseCase } from "../../application/use-case/courses/course-recording-detail.use-case";
import { CourseRecordingDetailResponseDto } from "../dtos/courses/course-recording-detail.response.dto";

/**
 * Statistics controller
 * @description Statistics controller which is used to handle the statistics requests.
 */
@Controller("statistics")
export class StatisticsController {
  /**
   * Constructor for StatisticsController
   * @param readingRecordingUseCase - The reading recording use case
   * @param readingRecordingDetailUseCase - The reading recording detail use case
   * @param courseRecordingDetailUseCase - The course recording detail use case
   */
  constructor(
    private readonly readingRecordingUseCase: ReadingRecordingUseCase,
    private readonly readingRecordingDetailUseCase: ReadingRecordingDetailUseCase,
    private readonly courseRecordingDetailUseCase: CourseRecordingDetailUseCase,
  ) {}

  /**
   * Get the reading recording statistics
   */
  @Get("reading-recording")
  public async getReadingRecording(
    @Body() requestDto: ReadingRecordingRequestDto,
    @Request() request: ExpressRequest,
  ): Promise<ReadingRecordingResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // get the reading recording
    const { totalMinutes, totalPages, totalRecordings } =
      await this.readingRecordingUseCase.execute(
        userId,
        requestDto.startDate ?? null,
        requestDto.endDate ?? null,
      );

    // return the reading recording response dto
    return {
      totalMinutes,
      totalPages,
      totalRecordings,
    };
  }

  /**
   * Get the reading recording statistics for today
   */
  @Get("reading-recording/today")
  public async getReadingRecordingToday(
    @Request() request: ExpressRequest,
  ): Promise<ReadingRecordingResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // get the reading recording
    const today: Date = new Date();
    const { totalMinutes, totalPages, totalRecordings } =
      await this.readingRecordingUseCase.execute(userId, today, today);

    // return the reading recording response dto
    return {
      totalMinutes,
      totalPages,
      totalRecordings,
    };
  }

  /**
   * Get the reading recording statistics for this week
   */
  @Get("reading-recording/week")
  public async getReadingRecordingWeek(
    @Request() request: ExpressRequest,
  ): Promise<ReadingRecordingResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // get the reading recording
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    // Get day of week
    const dayOfWeek = today.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Start of week
    const startOfWeek: Date = new Date(today);
    startOfWeek.setDate(today.getDate() - daysFromMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    // End of week
    const endOfWeek: Date = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const { totalMinutes, totalPages, totalRecordings } =
      await this.readingRecordingUseCase.execute(
        userId,
        startOfWeek,
        endOfWeek,
      );

    // return the reading recording response dto
    return {
      totalMinutes,
      totalPages,
      totalRecordings,
    };
  }

  /**
   * Get the detailed reading recording statistics
   */
  @Get("reading-recording/detail")
  public async getReadingRecordingDetail(
    @Body() requestDto: ReadingRecordingDetailRequestDto,
    @Request() request: ExpressRequest,
  ): Promise<ReadingRecordingDetailResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // get the detailed reading recording statistics
    const { data, totalCount } =
      await this.readingRecordingDetailUseCase.execute(
        userId,
        requestDto.startDate,
        requestDto.endDate,
        requestDto.limit,
        requestDto.page,
        requestDto.sort,
        requestDto.order,
      );

    // return the detailed reading recording statistics response dto
    return {
      recordings: data.map((recording) => BookRecordingMapper.toDto(recording)),
      totalCount,
    };
  }

  /**
   * Get the detailed reading recording statistics for today
   */
  @Get("reading-recording/detail/today")
  public async getReadingRecordingDetailToday(
    @Request() request: ExpressRequest,
  ): Promise<ReadingRecordingDetailResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // get the detailed reading recording statistics
    const today: Date = new Date();
    const { data, totalCount } =
      await this.readingRecordingDetailUseCase.execute(userId, today, today);

    // return the detailed reading recording statistics response dto
    return {
      recordings: data.map((recording) => BookRecordingMapper.toDto(recording)),
      totalCount,
    };
  }

  /**
   * Get the detailed reading recording statistics for this week
   */
  @Get("reading-recording/detail/week")
  public async getReadingRecordingDetailWeek(
    @Request() request: ExpressRequest,
  ): Promise<ReadingRecordingDetailResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // get the reading recording
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    // Get day of week
    const dayOfWeek = today.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Start of week
    const startOfWeek: Date = new Date(today);
    startOfWeek.setDate(today.getDate() - daysFromMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    // End of week
    const endOfWeek: Date = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // get the detailed reading recording statistics
    const { data, totalCount } =
      await this.readingRecordingDetailUseCase.execute(
        userId,
        startOfWeek,
        endOfWeek,
      );

    // return the detailed reading recording statistics response dto
    return {
      recordings: data.map((recording) => BookRecordingMapper.toDto(recording)),
      totalCount,
    };
  }

  /**
   * Get the detailed course recording statistics by user course id
   */
  @Get("course-recording/:id/detail")
  public async getCourseRecordingDetail(
    @Param("id") id: string,
  ): Promise<CourseRecordingDetailResponseDto> {
    // get the course recording detail statistics
    const { totalMinutes, minutesByType } =
      await this.courseRecordingDetailUseCase.execute(
        new ObjectIdValueObject(id),
      );

    // return the course recording detail statistics response dto
    return {
      totalMinutes,
      minutesByType,
    };
  }
}
