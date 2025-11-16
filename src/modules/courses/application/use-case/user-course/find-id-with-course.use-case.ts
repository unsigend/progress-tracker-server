import { Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Find user course id with course use case
 * @description Find user course id with course use case which is used to find a user course by id with course.
 */
@Injectable()
export class FindUserCourseIdWithCourseUseCase {
  /**
   * Constructor for FindUserCourseIdWithCourseUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the find user course id with course use case
   * @param id - The id of the user course
   * @returns The user course and the course
   */
  public async execute(
    id: ObjectIdValueObject,
  ): Promise<{ userCourse: UserCourseEntity; course: CourseEntity }> {
    // find the user course by id with course
    const userCourseWithCourse: {
      userCourse: UserCourseEntity;
      course: CourseEntity;
    } | null = await this.userCourseRepository.findByIdWithCourse(id);
    if (userCourseWithCourse === null) {
      throw new NotFoundException("User course not found");
    }

    // return the user course and the course
    return userCourseWithCourse;
  }
}
