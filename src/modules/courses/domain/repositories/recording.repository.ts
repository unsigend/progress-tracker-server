// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { CourseRecordingEntity } from "../entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { DailyRecordValueObject } from "../value-object/daily-record.vo";

/**
 * Course recording repository token
 * @description Course recording repository token which is used to inject the course recording repository.
 */
export const COURSE_RECORDING_REPOSITORY_TOKEN = Symbol(
  "COURSE_RECORDING_REPOSITORY_TOKEN",
);

/**
 * Course recording repository interface
 * @description Course recording repository which is used to store the course recording information.
 */
export interface ICourseRecordingRepository
  extends IBaseRepository<CourseRecordingEntity> {
  /**
   * Find course recordings by user course id
   * @param userCourseId - The user course id
   * @returns The course recordings and the total count of the course recordings
   */
  findByUserCourseId(
    userCourseId: ObjectIdValueObject,
  ): Promise<{ data: CourseRecordingEntity[]; totalCount: number }>;

  /**
   * Delete course recordings by user course id
   * @param userCourseId - The user course id
   * @returns True if the course recordings were deleted, false otherwise
   */
  deleteByUserCourseId(userCourseId: ObjectIdValueObject): Promise<boolean>;

  /**
   * Find daily records by user course id
   * @param userCourseId - The user course id
   * @param limit - The limit (number of days)
   * @param page - The page number
   * @param sort - The sort field (default: "date")
   * @param order - The sort order (default: "desc")
   * @returns The daily records and the total count of distinct days
   */
  findDailyRecordsByUserCourseId(
    userCourseId: ObjectIdValueObject,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: DailyRecordValueObject[]; totalDays: number }>;
}
