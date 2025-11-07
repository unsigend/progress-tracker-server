import { UserCourseStatus } from "@/modules/courses/domain/entities/user-course.entity";
import { CourseResponseDto } from "../course/course.response.dto";

/**
 * User course response DTO
 * @description User course response DTO which is used to return the user course information.
 */
export class UserCourseResponseDto {
  /** The id of the user course */
  id: string;

  /** The course id of the user course */
  courseId: string;

  /** The status of the user course */
  status: UserCourseStatus;

  /** The start date of the user course */
  startDate: Date | null;

  /** The completed date of the user course */
  completedDate: Date | null;

  /** The total minutes of the user course */
  totalMinutes: number;

  /** The total days of the user course */
  totalDays: number;

  /** The created at of the user course */
  createdAt: Date;

  /** The updated at of the user course */
  updatedAt: Date;

  /** The course of the user course */
  course: CourseResponseDto | null;
}
