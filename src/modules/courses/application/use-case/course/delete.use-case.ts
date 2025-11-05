import { Inject, Injectable } from "@nestjs/common";
import { COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/course.repository";
import { type ICourseRepository } from "@/modules/courses/domain/repositories/course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { PERMISSION_POLICY_TOKEN } from "@/shared/domain/services/permission-policy.service";
import { type IPermissionPolicy } from "@/shared/domain/services/permission-policy.service";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";

/**
 * Delete course use case
 * @description Delete course use case which is used to delete a course.
 */
@Injectable()
export class DeleteCourseUseCase {
  /**
   * Constructor for DeleteCourseUseCase
   * @param courseRepository - The course repository
   * @param permissionPolicy - The permission policy
   */
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private readonly courseRepository: ICourseRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<CourseEntity>,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete course use case
   * @param user - The user requesting the delete course
   * @param id - The id of the course
   * @returns True if the course was deleted, false otherwise
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
  ): Promise<boolean> {
    // check if the course exists
    const course: CourseEntity | null =
      await this.courseRepository.findById(id);
    if (course === null) {
      throw new NotFoundException("Course not found");
    }

    // permission check
    if (!(await this.permissionPolicy.canDelete(user, course))) {
      throw new PermissionException("Permission denied");
    }

    // if the course image url is not null
    if (course.getCourseImageUrl()) {
      await this.cloudService.delete(course.getCourseImageUrl()!);
    }

    // delete the course
    return await this.courseRepository.delete(id);
  }
}
