// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { CourseEntity } from "../entities/course.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * Course repository token
 * @description Course repository token which is used to inject the course repository.
 */
export const COURSE_REPOSITORY_TOKEN = Symbol("COURSE_REPOSITORY_TOKEN");

/**
 * Course repository interface
 * @description Course repository interface which is used to store the course information.
 */
export interface ICourseRepository extends IBaseRepository<CourseEntity> {
  /**
   * Find courses by created by
   * @param createdById - The id of the user who created the course
   * @returns The courses and the total count of the courses
   */
  findByCreatedBy(
    createdById: ObjectIdValueObject,
  ): Promise<{ data: CourseEntity[]; totalCount: number }>;
}
