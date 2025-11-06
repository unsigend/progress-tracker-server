import {
  Controller,
  Get,
  Param,
  Request,
  Delete,
  Post,
  UploadedFile,
  Body,
  Query,
  UseInterceptors,
  Put,
} from "@nestjs/common";
import { FindCourseIdUseCase } from "@/modules/courses/application/use-case/course/find-id.use-case";
import { DeleteCourseUseCase } from "@/modules/courses/application/use-case/course/delete.use-case";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { type Request as ExpressRequest } from "express";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { CourseResponseDto } from "../dtos/course/course.response.dto";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { CourseMapper } from "@/modules/courses/infrastructure/mapper/course.mapper";
import { CourseCreateRequestDto } from "../dtos/course/create.request.dto";
import { CreateCourseUseCase } from "@/modules/courses/application/use-case/course/create.use-case";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { FindAllCoursesUseCase } from "@/modules/courses/application/use-case/course/find-all.use-case";
import { CourseQueryRequestDto } from "../dtos/course/query.request.dto";
import { CoursesResponseDto } from "../dtos/course/courses.response.dto";
import { UpdateCourseUseCase } from "@/modules/courses/application/use-case/course/update.use-case";
import { FileInterceptor } from "@nestjs/platform-express";
import { CourseUpdateRequestDto } from "../dtos/course/update.request.dto";
import { CategoriesValueObject } from "../../domain/value-object/categories.vo";

@Controller("courses")
export class CourseController {
  /**
   * Constructor for CourseController
   * @param findCourseByIdUseCase - The find course by id use case
   * @param deleteCourseUseCase - The delete course use case
   * @param updateCourseUseCase - The update course use case
   * @param findCourseByIdUseCase - The find course by id use case
   * @param deleteCourseUseCase - The delete course use case
   * @param createCourseUseCase - The create course use case
   * @param findAllCoursesUseCase - The find all courses use case
   */
  constructor(
    private readonly findCourseByIdUseCase: FindCourseIdUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly findAllCoursesUseCase: FindAllCoursesUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
  ) {}

  /**
   * Create a course
   */
  @Post()
  @UseInterceptors(FileInterceptor("courseImage"))
  public async create(
    @Request() request: ExpressRequest,
    @Body() createCourseRequestDto: CourseCreateRequestDto,
    @UploadedFile() courseImage: Express.Multer.File,
  ): Promise<CourseResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;

    // create the course entity
    const course: CourseEntity = await this.createCourseUseCase.execute(
      userObj,
      createCourseRequestDto.name,
      userObj.getId(),
      createCourseRequestDto.isPublic ?? false,
      createCourseRequestDto.description ?? null,
      createCourseRequestDto.source ?? null,
      createCourseRequestDto.officialWebsiteUrl
        ? new UrlValueObject(createCourseRequestDto.officialWebsiteUrl)
        : null,
      createCourseRequestDto.categories
        ? new CategoriesValueObject(createCourseRequestDto.categories)
        : null,
      courseImage
        ? new ImageValueObject(courseImage.buffer, courseImage.mimetype)
        : null,
    );

    // map the course entity to the course response dto
    return CourseMapper.toDto(course);
  }

  /**
   * Find all courses
   */
  @Get()
  public async findAll(
    @Request() request: ExpressRequest,
    @Query() query: CourseQueryRequestDto,
  ): Promise<CoursesResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;

    // find all courses
    const { data, totalCount } = await this.findAllCoursesUseCase.execute(
      userObj,
      query.field,
      query.value,
      query.limit,
      query.page,
      query.sort,
      query.order,
    );

    // map the courses to the course response dtos
    const courseResponseDtos: CourseResponseDto[] = data.map((course) =>
      CourseMapper.toDto(course),
    );

    // return the courses and the total count of the courses
    return { courses: courseResponseDtos, totalCount };
  }

  /**
   * Find a course by id
   */
  @Get(":id")
  public async findById(
    @Request() request: ExpressRequest,
    @Param("id") id: string,
  ): Promise<CourseResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;

    const course: CourseEntity = await this.findCourseByIdUseCase.execute(
      userObj,
      new ObjectIdValueObject(id),
    );
    return CourseMapper.toDto(course);
  }

  /**
   * Delete a course by id
   */
  @Delete(":id")
  public async delete(
    @Request() request: ExpressRequest,
    @Param("id") id: string,
  ): Promise<{ success: boolean }> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;

    const result: boolean = await this.deleteCourseUseCase.execute(
      userObj,
      new ObjectIdValueObject(id),
    );
    return { success: result };
  }

  /**
   * Update a course by id
   */
  @Put(":id")
  @UseInterceptors(FileInterceptor("courseImage"))
  public async update(
    @Request() request: ExpressRequest,
    @Param("id") id: string,
    @Body() updateCourseRequestDto: CourseUpdateRequestDto,
    @UploadedFile() courseImage: Express.Multer.File,
  ): Promise<CourseResponseDto> {
    // get the user object from the request
    const userObj: UserEntity = request.user as UserEntity;

    // update the course
    const course: CourseEntity = await this.updateCourseUseCase.execute(
      userObj,
      new ObjectIdValueObject(id),
      updateCourseRequestDto.name,
      updateCourseRequestDto.isPublic ?? null,
      updateCourseRequestDto.description ?? null,
      updateCourseRequestDto.source ?? null,
      updateCourseRequestDto.officialWebsiteUrl
        ? new UrlValueObject(updateCourseRequestDto.officialWebsiteUrl)
        : null,
      updateCourseRequestDto.categories
        ? new CategoriesValueObject(updateCourseRequestDto.categories)
        : null,
      courseImage
        ? new ImageValueObject(courseImage.buffer, courseImage.mimetype)
        : null,
    );
    return CourseMapper.toDto(course);
  }
}
