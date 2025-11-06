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
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import {
  IMAGE_COMPRESSOR_TOKEN,
  type IImageCompress,
} from "@shared/domain/services/image-compress.service";
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
   * @param cloudService - The cloud service
   * @param imageCompressor - The image compressor
   * @param permissionPolicy - The permission policy
   */
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private readonly courseRepository: ICourseRepository,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
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
   * @param courseImageUrl - The course image url of the course
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
    courseImage?: ImageValueObject | null,
  ): Promise<CourseEntity> {
    // permission check
    if (!(await this.permissionPolicy.canModifyCollection(user))) {
      throw new PermissionException("Permission denied");
    }

    // if the course image is provided
    let courseImageUrl: UrlValueObject | null = null;
    if (courseImage) {
      // compress the course image
      const compressedCourseImage: ImageValueObject =
        await this.imageCompressor.compressImage(courseImage);

      // upload the compressed course image to the cloud
      courseImageUrl = await this.cloudService.upload(compressedCourseImage);
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
      courseImageUrl,
    );

    // save the course entity
    await this.courseRepository.save(courseEntity);

    // return the course entity
    return courseEntity;
  }
}
