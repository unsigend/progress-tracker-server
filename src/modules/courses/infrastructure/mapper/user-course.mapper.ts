import {
  UserCourseEntity,
  UserCourseStatus,
} from "@/modules/courses/domain/entities/user-course.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import {
  CourseStatus as CourseStatusModel,
  UserCourse as UserCourseModel,
} from "@prisma/client";
import { UserCourseResponseDto } from "../../presentation/dtos/user-course/user-course.response.dto";
import { CourseMapper } from "./course.mapper";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";

/**
 * User course mapper
 * @description User course mapper which is used to map the user course entity to the user course model and vice versa.
 */
export class UserCourseMapper {
  /**
   * Map a course status model to a course status entity
   * @param status - The course status model to map
   * @returns The course status entity
   */
  private static toEntityStatus(status: CourseStatusModel): UserCourseStatus {
    switch (status) {
      case CourseStatusModel.IN_PROGRESS:
        return UserCourseStatus.IN_PROGRESS;
      case CourseStatusModel.COMPLETED:
        return UserCourseStatus.COMPLETED;
    }
  }

  /**
   * Map a course status entity to a course status model
   * @param status - The course status entity to map
   * @returns The course status model
   */
  private static toModelStatus(status: UserCourseStatus): CourseStatusModel {
    switch (status) {
      case UserCourseStatus.IN_PROGRESS:
        return CourseStatusModel.IN_PROGRESS;
      case UserCourseStatus.COMPLETED:
        return CourseStatusModel.COMPLETED;
    }
  }
  /**
   * Map a user course model to a user course entity
   * @param userCourseModel - The user course model to map
   * @returns The user course entity
   */
  public static toEntity(userCourseModel: UserCourseModel): UserCourseEntity {
    return UserCourseEntity.reconstitute(
      new ObjectIdValueObject(userCourseModel.id),
      new ObjectIdValueObject(userCourseModel.courseId),
      new ObjectIdValueObject(userCourseModel.userId),
      this.toEntityStatus(userCourseModel.status),
      userCourseModel.startDate,
      userCourseModel.completedDate,
      userCourseModel.totalMinutes,
      userCourseModel.totalDays,
      userCourseModel.createdAt,
      userCourseModel.updatedAt,
    );
  }

  /**
   * Map a user course entity to a user course model
   * @param userCourse - The user course entity to map
   * @returns The user course model
   */
  public static toModel(userCourse: UserCourseEntity): UserCourseModel {
    return {
      id: userCourse.getId().getId(),
      courseId: userCourse.getCourseId().getId(),
      userId: userCourse.getUserId().getId(),
      status: this.toModelStatus(userCourse.getStatus()),
      startDate: userCourse.getStartDate(),
      completedDate: userCourse.getCompletedDate(),
      totalMinutes: userCourse.getTotalMinutes(),
      totalDays: userCourse.getTotalDays(),
      createdAt: userCourse.getCreatedAt(),
      updatedAt: userCourse.getUpdatedAt(),
    };
  }

  /**
   * Map a user course entity to a user course response dto
   * @param userCourse - The user course entity to map
   * @returns The user course response dto
   */
  public static toDto(
    userCourse: UserCourseEntity,
    course?: CourseEntity,
  ): UserCourseResponseDto {
    return {
      id: userCourse.getId().getId(),
      courseId: userCourse.getCourseId().getId(),
      status: userCourse.getStatus(),
      startDate: userCourse.getStartDate(),
      completedDate: userCourse.getCompletedDate(),
      totalMinutes: userCourse.getTotalMinutes(),
      totalDays: userCourse.getTotalDays(),
      createdAt: userCourse.getCreatedAt(),
      updatedAt: userCourse.getUpdatedAt(),
      course: course ? CourseMapper.toDto(course) : null,
    };
  }
}
