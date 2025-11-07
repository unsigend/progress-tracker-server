import { Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Find user course id use case
 * @description Find user course id use case which is used to find a user course by id.
 */
@Injectable()
export class FindUserCourseIdUseCase {
  /**
   * Constructor for FindUserCourseIdUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the find user course id use case
   * @param id - The id of the user course
   * @returns The user course
   */
  public async execute(id: ObjectIdValueObject): Promise<UserCourseEntity> {
    // find the user course by id
    const userCourse: UserCourseEntity | null =
      await this.userCourseRepository.findById(id);
    if (userCourse === null) {
      throw new NotFoundException("User course not found");
    }
    return userCourse;
  }
}
