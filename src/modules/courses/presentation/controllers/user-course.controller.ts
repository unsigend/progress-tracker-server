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
import { CreateUserCourseUseCase } from "../../application/use-case/user-course/create.use-case";
import { DeleteUserCourseUseCase } from "../../application/use-case/user-course/delete.use-case";
import { FindAllUserCoursesUseCase } from "../../application/use-case/user-course/find-all.use-case";
import { FindUserCourseIdUseCase } from "../../application/use-case/user-course/find-id.use-case";
import { FindUserCourseIdWithCourseUseCase } from "../../application/use-case/user-course/find-id-with-course.use-case";
import { FindAllUserCoursesWithCourseUseCase } from "../../application/use-case/user-course/find-all-with-course.use-case";
import { UserCoursesResponseDto } from "../dtos/user-course/user-courses.response.dto";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { UserCourseQueryRequestDto } from "../dtos/user-course/query.request.dto";
import { UserCourseResponseDto } from "../dtos/user-course/user-course.response.dto";
import { UserCourseMapper } from "../../infrastructure/mapper/user-course.mapper";
import { type Request as ExpressRequest } from "express";
import { ApiStandardResponse } from "@/shared/platforms/decorators/api-response.decorator";
import { UserCourseCreateRequestDto } from "../dtos/user-course/create.request.dto";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { CourseEntity } from "../../domain/entities/course.entity";
import { FindIdQueryRequestDto } from "@/modules/reading/presentation/dtos/user-book/find-id-query.request.dto";
import { MarkCourseCompleteUseCase } from "@/modules/courses/application/use-case/user-course/mark-complete.use-case";
import { DeleteCourseRecordingsUseCase } from "@/modules/courses/application/use-case/recording/delete.use-case";
import { CourseRecordingsResponseDto } from "../dtos/recordings/recordings.response.dto";
import { CourseRecordingMapper } from "../../infrastructure/mapper/recording.mapper";
import { CourseRecordingResponseDto } from "../dtos/recordings/recording.response.dto";
import { CourseRecordingQueryRequestDto } from "../dtos/recordings/query.request.dto";
import { FindAllCourseRecordingsUseCase } from "@/modules/courses/application/use-case/recording/find-all.use-case";
import { CourseRecordingCreateRequestDto } from "../dtos/recordings/create.request.dto";
import { CourseRecordingEntity } from "../../domain/entities/recording.entity";
import { CreateCourseRecordingUseCase } from "../../application/use-case/recording/create.use-case";
import { RecordTypeValueObject } from "../../domain/value-object/record-type.vo";
/**
 * User course controller
 * @description User course controller which is used to handle the user course requests.
 */
@Controller("user-course")
export class UserCourseController {
  /**
   * Constructor for UserCourseController
   * @param createUserCourseUseCase - The create user course use case
   * @param deleteUserCourseUseCase - The delete user course use case
   */
  constructor(
    private readonly createUserCourseUseCase: CreateUserCourseUseCase,
    private readonly deleteUserCourseUseCase: DeleteUserCourseUseCase,
    private readonly findAllUserCoursesUseCase: FindAllUserCoursesUseCase,
    private readonly findUserCourseIdUseCase: FindUserCourseIdUseCase,
    private readonly findUserCourseIdWithCourseUseCase: FindUserCourseIdWithCourseUseCase,
    private readonly findAllUserCoursesWithCourseUseCase: FindAllUserCoursesWithCourseUseCase,
    private readonly markCourseCompleteUseCase: MarkCourseCompleteUseCase,
    private readonly deleteCourseRecordingsUseCase: DeleteCourseRecordingsUseCase,
    private readonly findAllCourseRecordingsUseCase: FindAllCourseRecordingsUseCase,
    private readonly createCourseRecordingUseCase: CreateCourseRecordingUseCase,
  ) {}

  /**
   * Find all user courses
   */
  @Get()
  @ApiStandardResponse(UserCoursesResponseDto)
  public async findAll(
    @Request() request: ExpressRequest,
    @Query() queryRequestDto: UserCourseQueryRequestDto,
  ): Promise<UserCoursesResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    if (queryRequestDto.expand) {
      const { data, totalCount } =
        await this.findAllUserCoursesWithCourseUseCase.execute(
          userId,
          queryRequestDto.field,
          queryRequestDto.value,
          queryRequestDto.limit,
          queryRequestDto.page,
          queryRequestDto.sort,
          queryRequestDto.order,
        );

      // map the user courses to the user course response dtos
      const userCourseResponseDtos: UserCourseResponseDto[] = data.map(
        (userCourseWithCourse) =>
          UserCourseMapper.toDto(
            userCourseWithCourse.userCourse,
            userCourseWithCourse.course,
          ),
      );

      // return the user courses with courses and the total count of the user courses with courses
      return { userCourses: userCourseResponseDtos, totalCount };
    } else {
      const { data, totalCount } = await this.findAllUserCoursesUseCase.execute(
        userId,
        queryRequestDto.field,
        queryRequestDto.value,
        queryRequestDto.limit,
        queryRequestDto.page,
        queryRequestDto.sort,
        queryRequestDto.order,
      );

      // map the user courses to the user course response dtos
      const userCourseResponseDtos: UserCourseResponseDto[] = data.map(
        (userCourse) => UserCourseMapper.toDto(userCourse),
      );

      // return the user courses and the total count of the user courses
      return { userCourses: userCourseResponseDtos, totalCount };
    }
  }

  /**
   * Create a user course
   */
  @Post()
  @ApiStandardResponse(UserCourseResponseDto)
  public async create(
    @Request() request: ExpressRequest,
    @Body() createUserCourseRequestDto: UserCourseCreateRequestDto,
  ): Promise<UserCourseResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;
    const userId: ObjectIdValueObject = userObj.getId();

    // create the user course entity
    const userCourse: UserCourseEntity =
      await this.createUserCourseUseCase.execute(
        userId,
        new ObjectIdValueObject(createUserCourseRequestDto.courseId),
      );

    // map the user course entity to the user course response dto
    return UserCourseMapper.toDto(userCourse);
  }

  /**
   * Find a user course by id
   */
  @Get(":id")
  @ApiStandardResponse(UserCourseResponseDto)
  public async findById(
    @Query() findIdQueryRequestDto: FindIdQueryRequestDto,
    @Param("id") id: string,
  ): Promise<UserCourseResponseDto> {
    if (findIdQueryRequestDto.expand) {
      const userCourseWithCourse: {
        userCourse: UserCourseEntity;
        course: CourseEntity;
      } = await this.findUserCourseIdWithCourseUseCase.execute(
        new ObjectIdValueObject(id),
      );
      return UserCourseMapper.toDto(
        userCourseWithCourse.userCourse,
        userCourseWithCourse.course,
      );
    } else {
      const userCourse: UserCourseEntity =
        await this.findUserCourseIdUseCase.execute(new ObjectIdValueObject(id));
      return UserCourseMapper.toDto(userCourse);
    }
  }

  /**
   * Delete a user course
   */
  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const result: boolean = await this.deleteUserCourseUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: result };
  }

  /**
   * Mark a user course as complete
   */
  @Post(":id/mark-complete")
  public async markComplete(
    @Request() request: ExpressRequest,
    @Param("id") id: string,
  ): Promise<{ success: boolean }> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;

    // mark the user course as complete
    await this.markCourseCompleteUseCase.execute(
      userObj,
      new ObjectIdValueObject(id),
    );
    return { success: true };
  }

  /**
   * Delete course recordings
   */
  @Delete(":id/recordings")
  public async deleteRecordings(
    @Param("id") id: string,
  ): Promise<{ success: boolean }> {
    const result: boolean = await this.deleteCourseRecordingsUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: result };
  }

  /**
   * Find all course recordings
   */
  @Get(":id/recordings")
  @ApiStandardResponse(CourseRecordingsResponseDto)
  public async findRecordings(
    @Param("id") id: string,
    @Query() recordingQueryRequestDto: CourseRecordingQueryRequestDto,
  ): Promise<CourseRecordingsResponseDto> {
    // get all course recordings based on the user course id
    const { data, totalCount } =
      await this.findAllCourseRecordingsUseCase.execute(
        new ObjectIdValueObject(id),
        recordingQueryRequestDto.limit,
        recordingQueryRequestDto.page,
        recordingQueryRequestDto.sort,
        recordingQueryRequestDto.order,
      );

    // map the course recordings to the course recording response dtos
    const courseRecordingResponseDtos: CourseRecordingResponseDto[] = data.map(
      (courseRecording) => CourseRecordingMapper.toResponseDto(courseRecording),
    );

    // return the course recordings and the total count of the course recordings
    return { recordings: courseRecordingResponseDtos, totalCount };
  }

  /**
   * Create a course recording
   */
  @Post(":id/recordings")
  @ApiStandardResponse(CourseRecordingResponseDto)
  public async createRecording(
    @Param("id") id: string,
    @Body() createRecordingRequestDto: CourseRecordingCreateRequestDto,
  ): Promise<CourseRecordingResponseDto> {
    const courseRecording: CourseRecordingEntity =
      await this.createCourseRecordingUseCase.execute(
        new ObjectIdValueObject(id),
        createRecordingRequestDto.date,
        createRecordingRequestDto.minutes,
        new RecordTypeValueObject(createRecordingRequestDto.recordType),
        createRecordingRequestDto.notes,
      );

    return CourseRecordingMapper.toResponseDto(courseRecording);
  }
}
