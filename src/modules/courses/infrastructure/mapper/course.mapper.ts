// import dependencies
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { Course as CourseModel } from "@prisma/client";
import { CourseResponseDto } from "../../presentation/dtos/course/course.response.dto";

/**
 * Course mapper
 * @description Course mapper which is used to map the course entity to the course model and vice versa.
 */
export class CourseMapper {
  /**
   * Map a course model to a course entity
   * @param courseModel - The course model to map
   * @returns The course entity
   */
  public static toEntity(courseModel: CourseModel): CourseEntity {
    return CourseEntity.reconstitute(
      new ObjectIdValueObject(courseModel.id),
      courseModel.name,
      new ObjectIdValueObject(courseModel.createdById),
      courseModel.isPublic,
      courseModel.description,
      courseModel.source,
      courseModel.officialWebsiteUrl
        ? new UrlValueObject(courseModel.officialWebsiteUrl)
        : null,
      courseModel.courseImageUrl
        ? new UrlValueObject(courseModel.courseImageUrl)
        : null,
      courseModel.createdAt,
      courseModel.updatedAt,
    );
  }

  /**
   * Map a course entity to a course model
   * @param course - The course entity to map
   * @returns The course model
   */
  public static toModel(course: CourseEntity): CourseModel {
    return {
      id: course.getId().getId(),
      name: course.getName(),
      isPublic: course.getIsPublic(),
      description: course.getDescription(),
      source: course.getSource(),
      officialWebsiteUrl: course.getOfficialWebsiteUrl()?.getUrl() ?? null,
      courseImageUrl: course.getCourseImageUrl()?.getUrl() ?? null,
      createdById: course.getCreatedById().getId(),
      createdAt: course.getCreatedAt(),
      updatedAt: course.getUpdatedAt(),
    };
  }

  /**
   * Map a course entity to a course response dto
   * @param course - The course entity to map
   * @returns The course response dto
   */
  public static toDto(course: CourseEntity): CourseResponseDto {
    return {
      id: course.getId().getId(),
      name: course.getName(),
      isPublic: course.getIsPublic(),
      description: course.getDescription(),
      source: course.getSource(),
      officialWebsiteUrl: course.getOfficialWebsiteUrl()?.getUrl() ?? null,
      courseImageUrl: course.getCourseImageUrl()?.getUrl() ?? null,
      createdAt: course.getCreatedAt(),
      updatedAt: course.getUpdatedAt(),
      createdById: course.getCreatedById().getId(),
    };
  }
}
