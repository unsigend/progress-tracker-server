import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  COURSE_REPOSITORY_TOKEN,
  type ICourseRepository,
} from "@/modules/courses/domain/repositories/course.repository";
import {
  type IPermissionPolicy,
  PERMISSION_POLICY_TOKEN,
} from "@/shared/domain/services/permission-policy.service";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { PermissionException } from "@shared/domain/exceptions/permission.exception";
import { CategoriesValueObject } from "@/modules/courses/domain/value-object/categories.vo";

/**
 * Update course use case
 * @description Update course use case which is used to update a course.
 */
@Injectable()
export class UpdateCourseUseCase {
  /**
   * Constructor for UpdateCourseUseCase
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
   * Execute the update course use case
   * @param user - The user requesting the update course
   * @param id - The id of the course to update
   * @param name - The name of the course to update
   * @param isPublic - The is public of the course to update
   * @param description - The description of the course to update
   * @param source - The source of the course to update
   * @param officialWebsiteUrl - The official website url of the course to update
   * @param categories - The categories of the course to update
   * @returns The updated course
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
    name?: string | null,
    isPublic?: boolean | null,
    description?: string | null,
    source?: string | null,
    officialWebsiteUrl?: UrlValueObject | null,
    categories?: CategoriesValueObject | null,
  ): Promise<CourseEntity> {
    // check if the course exists
    const course: CourseEntity | null =
      await this.courseRepository.findById(id);
    if (course === null) {
      throw new NotFoundException("Course not found");
    }

    // permission check
    if (!(await this.permissionPolicy.canModify(user, course))) {
      throw new PermissionException("Permission denied");
    }

    // if the name is provided
    if (name) {
      course.setName(name);
    }

    // if the categories is provided
    if (categories) {
      course.setCategories(categories);
    }

    // if the is public is provided
    if (isPublic !== undefined && isPublic !== null) {
      course.setIsPublic(isPublic);
    }

    // if the description is provided
    if (description) {
      course.setDescription(description);
    }

    // if the source is provided
    if (source) {
      course.setSource(source);
    }

    // if the official website url is provided
    if (officialWebsiteUrl) {
      course.setOfficialWebsiteUrl(officialWebsiteUrl);
    }

    // save the course
    await this.courseRepository.save(course);

    // return the course
    return course;
  }
}
