// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { UserCourseEntity } from "../entities/user-course.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { CourseEntity } from "../entities/course.entity";

/**
 * User course repository token
 * @description User course repository token which is used to inject the user course repository.
 */
export const USER_COURSE_REPOSITORY_TOKEN = Symbol(
  "USER_COURSE_REPOSITORY_TOKEN",
);

/**
 * User course repository interface
 * @description User course repository interface which is used to store the user course information.
 */
export interface IUserCourseRepository
  extends IBaseRepository<UserCourseEntity> {
  /**
   * Find a user course by course id and user id
   * @param courseId - The course id
   * @param userId - The user id
   * @returns The user course or null if not found
   */
  findByCourseIdAndUserId(
    courseId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
  ): Promise<UserCourseEntity | null>;

  /**
   * Find all user courses with course
   * @param query - The query
   * @returns The user courses and the total count of the user courses
   */
  findAllWithCourse(query: QueryBase): Promise<{
    data: Array<{ userCourse: UserCourseEntity; course: CourseEntity }>;
    totalCount: number;
  }>;

  /**
   * Find a user course by id with course
   * @param id - The id of the user course
   * @returns The user course and the course or null if not found
   */
  findByIdWithCourse(id: ObjectIdValueObject): Promise<{
    userCourse: UserCourseEntity;
    course: CourseEntity;
  } | null>;
}
