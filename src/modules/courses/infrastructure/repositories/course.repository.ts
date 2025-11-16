// import dependencies
import { Injectable } from "@nestjs/common";
import { ICourseRepository } from "@/modules/courses/domain/repositories/course.repository";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { CourseMapper } from "../mapper/course.mapper";
import { Course as CourseModel, Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { ServerException } from "@/shared/domain/exceptions/server.exception";

/**
 * Course repository
 * @description Course repository which is used to store the course information.
 */
@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a course
   * @param course - The course to save
   * @returns void
   */
  public async save(course: CourseEntity): Promise<void> {
    // map the course entity to the course model
    const courseModel: CourseModel = CourseMapper.toModel(course);
    // upsert the course model into the database
    await this.postgresqlService.course.upsert({
      where: { id: courseModel.id },
      update: courseModel,
      create: courseModel,
    });
  }

  /**
   * Find a course by id
   * @param id - The id of the course
   * @returns The course or null if not found
   */
  public async findById(id: ObjectIdValueObject): Promise<CourseEntity | null> {
    // find the course by id
    const courseModel: CourseModel | null =
      await this.postgresqlService.course.findUnique({
        where: { id: id.getId() },
      });
    // return the course entity
    return courseModel ? CourseMapper.toEntity(courseModel) : null;
  }

  /**
   * Find all courses
   * @param query - The query to find the courses
   * @returns The courses and the total count of the courses
   */
  public async findAll(
    query: QueryBase,
  ): Promise<{ data: CourseEntity[]; totalCount: number }> {
    // find the courses by query
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.CourseWhereInput,
      Prisma.CourseOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find the courses
    let courseModels: CourseModel[] = [];
    try {
      courseModels = await this.postgresqlService.course.findMany({
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

    // get the total count of the courses
    const totalCount: number = await this.postgresqlService.course.count({
      where: whereClause,
    });

    // return the courses and the total count of the courses
    return {
      data: courseModels.map((courseModel) =>
        CourseMapper.toEntity(courseModel),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Find courses by created by
   * @param createdById - The id of the user who created the course
   * @returns The courses and the total count of the courses
   */
  public async findByCreatedBy(
    createdById: ObjectIdValueObject,
  ): Promise<{ data: CourseEntity[]; totalCount: number }> {
    // find the courses by created by
    const courseModels: CourseModel[] =
      await this.postgresqlService.course.findMany({
        where: { createdById: createdById.getId() },
      });
    // return the courses and the total count of the courses
    return {
      data: courseModels.map((courseModel) =>
        CourseMapper.toEntity(courseModel),
      ),
      totalCount: courseModels.length,
    };
  }

  /**
   * Delete a course
   * @param id - The id of the course
   * @returns True if the course was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the course by id
    const result: CourseModel | null =
      await this.postgresqlService.course.delete({
        where: { id: id.getId() },
      });
    return result ? true : false;
  }
}
