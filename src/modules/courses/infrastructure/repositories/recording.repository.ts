// import dependencies
import { ICourseRecordingRepository } from "@/modules/courses/domain/repositories/recording.repository";
import { CourseRecordingEntity } from "@/modules/courses/domain/entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { CourseRecord as CourseRecordingModel } from "@prisma/client";
import { CourseRecordingMapper } from "../mapper/recording.mapper";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { ServerException } from "@/shared/domain/exceptions/server.exception";
import { Injectable } from "@nestjs/common";
import { QueryBase } from "@/shared/domain/queries/base.query";

/**
 * Course recording repository
 * @description Course recording repository which is used to store the course recording information.
 */
@Injectable()
export class CourseRecordingRepository implements ICourseRecordingRepository {
  // private constructor
  public constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a course recording
   * @param courseRecording - The course recording to save
   * @returns void
   */
  public async save(courseRecording: CourseRecordingEntity): Promise<void> {
    // map the course recording entity to the course recording model
    const courseRecordingModel: CourseRecordingModel =
      CourseRecordingMapper.toModel(courseRecording);

    // upsert the course recording model into the database
    await this.postgresqlService.courseRecord.upsert({
      where: { id: courseRecordingModel.id },
      update: courseRecordingModel,
      create: courseRecordingModel,
    });
  }

  /**
   * Find a course recording by id
   * @param id - The id of the course recording
   * @returns The course recording or null if not found
   */
  public async findById(
    id: ObjectIdValueObject,
  ): Promise<CourseRecordingEntity | null> {
    // find the course recording by id
    const courseRecordingModel: CourseRecordingModel | null =
      await this.postgresqlService.courseRecord.findUnique({
        where: { id: id.getId() },
      });
    return courseRecordingModel
      ? CourseRecordingMapper.toEntity(courseRecordingModel)
      : null;
  }

  /**
   * Find course recordings by user course id
   * @param userCourseId - The user course id
   * @returns The course recordings and the total count of the course recordings
   */
  public async findByUserCourseId(
    userCourseId: ObjectIdValueObject,
  ): Promise<{ data: CourseRecordingEntity[]; totalCount: number }> {
    // find the course recordings by user course id
    const courseRecordingsModels: CourseRecordingModel[] =
      await this.postgresqlService.courseRecord.findMany({
        where: { userCourseId: userCourseId.getId() },
      });
    return {
      data: courseRecordingsModels.map((courseRecordingModel) =>
        CourseRecordingMapper.toEntity(courseRecordingModel),
      ),
      totalCount: courseRecordingsModels.length,
    };
  }

  /**
   * Delete course recordings by user course id
   * @param userCourseId - The user course id
   * @returns True if the course recordings were deleted, false otherwise
   */
  public async deleteByUserCourseId(
    userCourseId: ObjectIdValueObject,
  ): Promise<boolean> {
    // delete the course recordings by user course id
    const result: { count: number } =
      await this.postgresqlService.courseRecord.deleteMany({
        where: { userCourseId: userCourseId.getId() },
      });
    return result.count > 0 ? true : false;
  }

  /**
   * Find all course recordings
   * @param query - The query to find the course recordings
   * @returns The course recordings and the total count of the course recordings
   */
  public async findAll(
    query: QueryBase,
  ): Promise<{ data: CourseRecordingEntity[]; totalCount: number }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.CourseRecordWhereInput,
      Prisma.CourseRecordOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find the course recordings by query
    let courseRecordingsModels: CourseRecordingModel[] = [];
    try {
      courseRecordingsModels =
        await this.postgresqlService.courseRecord.findMany({
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

    // get the total count of the course recordings
    const totalCount: number = await this.postgresqlService.courseRecord.count({
      where: whereClause,
    });
    return {
      data: courseRecordingsModels.map((courseRecordingModel) =>
        CourseRecordingMapper.toEntity(courseRecordingModel),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a course recording by id
   * @param id - The id of the course recording
   * @returns True if the course recording was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the course recording by id
    const result: CourseRecordingModel | null =
      await this.postgresqlService.courseRecord.delete({
        where: { id: id.getId() },
      });
    return result ? true : false;
  }
}
