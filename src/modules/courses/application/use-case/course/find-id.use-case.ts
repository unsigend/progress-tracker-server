import { Inject, Injectable } from "@nestjs/common";
import { COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/course.repository";
import { type ICourseRepository } from "@/modules/courses/domain/repositories/course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import {
  type IPermissionPolicy,
  PERMISSION_POLICY_TOKEN,
} from "@/shared/domain/services/permission-policy.service";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";

/**
 * Find course by id use case
 * @description Find course by id use case which is used to find a course by id.
 */
@Injectable()
export class FindCourseIdUseCase {
  /**
   * Constructor for FindCourseIdUseCase
   * @param courseRepository - The course repository
   * @param permissionPolicy - The permission policy
   */
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private readonly courseRepository: ICourseRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<CourseEntity>,
  ) {}

  /**
   * Execute the find course by id use case
   * @param user - The user requesting the find course by id
   * @param id - The id of the course
   * @returns The course
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
  ): Promise<CourseEntity> {
    // permission check
    if (!(await this.permissionPolicy.canAccess(user, id))) {
      throw new PermissionException("Permission denied");
    }

    // check if the course exists
    const course: CourseEntity | null =
      await this.courseRepository.findById(id);
    if (course === null) {
      throw new NotFoundException("Course not found");
    }
    return course;
  }
}
