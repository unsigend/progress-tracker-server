import { Injectable } from "@nestjs/common";
import { IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { UserCourseMapper } from "../mapper/user-course.mapper";
import {
  UserCourse as UserCourseModel,
  Course as CourseModel,
  Prisma,
} from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { ServerException } from "@/shared/domain/exceptions/server.exception";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";
import { CourseMapper } from "../mapper/course.mapper";
/**
 * User course repository
 * @description User course repository which is used to store the user course information.
 */
@Injectable()
export class UserCourseRepository implements IUserCourseRepository {
  constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a user course
   * @param userCourse - The user course to save
   * @returns void
   */
  public async save(userCourse: UserCourseEntity): Promise<void> {
    // map the user course entity to the user course model
    const userCourseModel: UserCourseModel =
      UserCourseMapper.toModel(userCourse);
    // upsert the user course model into the database
    await this.postgresqlService.userCourse.upsert({
      where: { id: userCourseModel.id },
      update: userCourseModel,
      create: userCourseModel,
    });
  }

  /**
   * Find a user course by course id and user id
  /**
   * Find a user course by course id and user id
   * @param courseId - The course id
   * @param userId - The user id
   * @returns The user course or null if not found
   */
  public async findByCourseIdAndUserId(
    courseId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
  ): Promise<UserCourseEntity | null> {
    // find the user course by course id and user id
    const userCourseModel: UserCourseModel | null =
      await this.postgresqlService.userCourse.findUnique({
        where: {
          courseId_userId: {
            courseId: courseId.getId(),
            userId: userId.getId(),
          },
        },
      });
    return userCourseModel ? UserCourseMapper.toEntity(userCourseModel) : null;
  }

  /**
   * Find a user course by id
   * @param id - The id of the user course
   * @returns The user course or null if not found
   */
  public async findById(
    id: ObjectIdValueObject,
  ): Promise<UserCourseEntity | null> {
    // find the user course by id
    const userCourseModel: UserCourseModel | null =
      await this.postgresqlService.userCourse.findUnique({
        where: { id: id.getId() },
      });
    return userCourseModel ? UserCourseMapper.toEntity(userCourseModel) : null;
  }

  /**
   * Find all user courses with course
   * @param query - The query
   * @returns The user courses and the total count of the user courses
   */
  public async findAllWithCourse(query: QueryBase): Promise<{
    data: Array<{ userCourse: UserCourseEntity; course: CourseEntity }>;
    totalCount: number;
  }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.UserCourseWhereInput,
      Prisma.UserCourseOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find all user courses with course
    let userCourseWithCourses: Array<
      UserCourseModel & { course: CourseModel }
    > = [];
    try {
      userCourseWithCourses = await this.postgresqlService.userCourse.findMany({
        where: whereClause,
        orderBy: orderClause,
        take: take,
        skip: skip,
        include: {
          course: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ValidationException("Invalid query key");
      }
      throw new ServerException("An unexpected error occurred");
    }
    // get the total count of the user courses
    const totalCount: number = await this.postgresqlService.userCourse.count({
      where: whereClause,
    });

    // return the user courses with courses and the total count of the user courses
    return {
      data: userCourseWithCourses.map((userCourseWithCourse) => ({
        userCourse: UserCourseMapper.toEntity(userCourseWithCourse),
        course: CourseMapper.toEntity(userCourseWithCourse.course),
      })),
      totalCount: totalCount,
    };
  }

  /**
   * Find a user course by id with course
   * @param id - The id of the user course
   * @returns The user course and the course or null if not found
   */
  public async findByIdWithCourse(id: ObjectIdValueObject): Promise<{
    userCourse: UserCourseEntity;
    course: CourseEntity;
  } | null> {
    // find the user course by id with course
    const userCourseWithCourse:
      | (UserCourseModel & { course: CourseModel })
      | null = await this.postgresqlService.userCourse.findUnique({
      where: { id: id.getId() },
      include: {
        course: true,
      },
    });
    return userCourseWithCourse
      ? {
          userCourse: UserCourseMapper.toEntity(userCourseWithCourse),
          course: CourseMapper.toEntity(userCourseWithCourse.course),
        }
      : null;
  }

  /**
   * Find all user courses
   * @param query - The query
   * @returns The user courses and the total count of the user courses
   */
  public async findAll(query: QueryBase): Promise<{
    data: UserCourseEntity[];
    totalCount: number;
  }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.UserCourseWhereInput,
      Prisma.UserCourseOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find all user courses
    let userCourseWithCourses: UserCourseModel[] = [];
    try {
      userCourseWithCourses = await this.postgresqlService.userCourse.findMany({
        where: whereClause,
        orderBy: orderClause,
        take: take,
        skip: skip,
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ValidationException("Invalid query key");
      }
      throw new ServerException("An unexpected error occurred");
    }
    // get the total count of the user courses
    const totalCount: number = await this.postgresqlService.userCourse.count({
      where: whereClause,
    });
    // return the user courses and the total count of the user courses
    return {
      data: userCourseWithCourses.map((userCourse) =>
        UserCourseMapper.toEntity(userCourse),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a user course by id
   * @param id - The id of the user course
   * @returns True if the user course was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the user course by id
    const result: UserCourseModel | null =
      await this.postgresqlService.userCourse.delete({
        where: { id: id.getId() },
      });
    return result ? true : false;
  }
}
