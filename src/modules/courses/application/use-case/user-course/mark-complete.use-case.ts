import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { PERMISSION_POLICY_TOKEN } from "@/shared/domain/services/permission-policy.service";
import { type IPermissionPolicy } from "@/shared/domain/services/permission-policy.service";

/**
 * Mark course complete use case
 * @description Mark course complete use case which is used to mark a course as complete.
 */
@Injectable()
export class MarkCourseCompleteUseCase {
  /**
   * Constructor for MarkCourseCompleteUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<UserCourseEntity>,
  ) {}

  /**
   * Execute the mark course complete use case
   * @param id - The id of the user course
   * @returns True if the user course was marked as complete, false otherwise
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
  ): Promise<void> {
    // check if the user course exists
    const userCourse: UserCourseEntity | null =
      await this.userCourseRepository.findById(id);
    if (userCourse === null) {
      throw new NotFoundException("User course not found");
    }

    // check permission
    if (!(await this.permissionPolicy.canModify(user, userCourse))) {
      throw new PermissionException("Permission denied");
    }

    // mark the user course as complete
    userCourse.markAsComplete();

    // save the user course
    await this.userCourseRepository.save(userCourse);
  }
}
