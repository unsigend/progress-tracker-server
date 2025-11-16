import {
  COURSE_REPOSITORY_TOKEN,
  type ICourseRepository,
} from "@/modules/courses/domain/repositories/course.repository";
import { PERMISSION_POLICY_TOKEN } from "@/shared/domain/services/permission-policy.service";
import { Inject, Injectable } from "@nestjs/common";
import { type IPermissionPolicy } from "@/shared/domain/services/permission-policy.service";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";
import { CategoriesValueObject } from "@/modules/courses/domain/value-object/categories.vo";

/**
 * Create course use case
 * @description Create course use case which is used to create a new course.
 */
@Injectable()
export class CreateCourseUseCase {
  /**
   * Constructor for CreateCourseUseCase
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
   * Execute the create course use case
   * @param user - The user requesting the create course
   * @param name - The name of the course
   * @param createdById - The id of the user who created the course
   * @param isPublic - The is public of the course
   * @param description - The description of the course
   * @param source - The source of the course
   * @param officialWebsiteUrl - The official website url of the course
   * @param categories - The categories of the course
   * @returns The created course
   */
  public async execute(
    user: UserEntity,
    name: string,
    createdById: ObjectIdValueObject,
    isPublic?: boolean | null,
    description?: string | null,
    source?: string | null,
    officialWebsiteUrl?: UrlValueObject | null,
    categories?: CategoriesValueObject | null,
  ): Promise<CourseEntity> {
    // permission check
    if (!(await this.permissionPolicy.canModifyCollection(user))) {
      throw new PermissionException("Permission denied");
    }

    // create the course entity
    const courseEntity: CourseEntity = CourseEntity.create(
      name,
      createdById,
      isPublic,
      description,
      source,
      officialWebsiteUrl,
      categories,
    );

    // save the course entity
    await this.courseRepository.save(courseEntity);

    // return the course entity
    return courseEntity;
  }
}
