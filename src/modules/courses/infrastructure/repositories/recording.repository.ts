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
import { DailyRecordValueObject } from "@/modules/courses/domain/value-object/daily-record.vo";

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

  /**
   * Find daily records by user course id
   * @param userCourseId - The user course id
   * @param limit - The limit (number of days)
   * @param page - The page number
   * @param sort - The sort field (default: "date")
   * @param order - The sort order (default: "desc")
   * @returns The daily records and the total count of distinct days
   */
  public async findDailyRecordsByUserCourseId(
    userCourseId: ObjectIdValueObject,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: DailyRecordValueObject[]; totalDays: number }> {
    // Build where clause using Prisma
    const whereClause: Prisma.CourseRecordWhereInput = {
      userCourseId: userCourseId.getId(),
    };

    // Set defaults
    const DEFAULT_LIMIT = 10;
    const DEFAULT_PAGE = 1;
    const DEFAULT_ORDER: "asc" | "desc" = "desc";
    const sortOrder: "asc" | "desc" = order ?? DEFAULT_ORDER;

    try {
      // Step 1: Fetch all recordings for the user course
      // We'll group by date in memory, so we fetch all matching records
      const allRecordings: CourseRecordingModel[] =
        await this.postgresqlService.courseRecord.findMany({
          where: whereClause,
          orderBy: [
            {
              date: sortOrder,
            },
            {
              recordType: "asc",
            },
          ],
        });

      // Step 2: Group recordings by date in memory
      const recordingsByDateMap = new Map<string, CourseRecordingModel[]>();

      allRecordings.forEach((recording) => {
        // Normalize date to YYYY-MM-DD format for consistent grouping
        const date = new Date(recording.date);
        const dateKey = date.toISOString().split("T")[0];

        if (!recordingsByDateMap.has(dateKey)) {
          recordingsByDateMap.set(dateKey, []);
        }
        recordingsByDateMap.get(dateKey)!.push(recording);
      });

      // Step 3: Get distinct dates and sort them
      const distinctDates: Date[] = Array.from(recordingsByDateMap.keys())
        .map((dateKey) => {
          // Create date from YYYY-MM-DD string
          const [year, month, day] = dateKey.split("-").map(Number);
          return new Date(Date.UTC(year, month - 1, day));
        })
        .sort((a, b) => {
          return sortOrder === "desc"
            ? b.getTime() - a.getTime()
            : a.getTime() - b.getTime();
        });

      const totalDays: number = distinctDates.length;

      // Step 4: Apply pagination to distinct dates
      // Use default limit if limit is undefined, null, or 0
      const take: number = limit && limit > 0 ? limit : DEFAULT_LIMIT;
      const currentPage: number = page && page > 0 ? page : DEFAULT_PAGE;
      const skip: number = (currentPage - 1) * take;
      const paginatedDates = distinctDates.slice(skip, skip + take);

      // Step 5: Create DailyRecordValueObject instances for paginated dates
      const dailyRecords: DailyRecordValueObject[] = paginatedDates.map(
        (date) => {
          const dateKey = date.toISOString().split("T")[0];
          const dailyRecord = new DailyRecordValueObject(date);

          // Add all recordings for this date
          const recordingsForDate = recordingsByDateMap.get(dateKey) || [];
          recordingsForDate.forEach((recording) => {
            dailyRecord.addRecord(
              recording.recordType,
              recording.minutes,
              recording.notes,
            );
          });

          return dailyRecord;
        },
      );

      return { data: dailyRecords, totalDays };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        // Log the actual Prisma error for debugging
        console.error("Prisma validation error:", error.message);
        throw new ValidationException(
          `Invalid query parameters: ${error.message}`,
        );
      }
      // Log other errors for debugging
      console.error(
        "Unexpected error in findDailyRecordsByUserCourseId:",
        error,
      );
      throw new ServerException("An unexpected error occurred");
    }
  }
}
