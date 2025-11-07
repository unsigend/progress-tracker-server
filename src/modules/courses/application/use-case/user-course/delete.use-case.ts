import { Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";

/**
 * Delete user course use case
 * @description Delete user course use case which is used to delete a user course.
 */
@Injectable()
export class DeleteUserCourseUseCase {
  /**
   * Constructor for DeleteUserCourseUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the delete user course use case
   * @param id - The id of the user course
   * @returns True if the user course was deleted, false otherwise
   */
  public async execute(id: ObjectIdValueObject): Promise<boolean> {
    // check if the user course exists
    const userCourse: UserCourseEntity | null =
      await this.userCourseRepository.findById(id);
    if (userCourse === null) {
      throw new NotFoundException("User course not found");
    }
    return await this.userCourseRepository.delete(id);
  }
}
