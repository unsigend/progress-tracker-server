import { UserCourseResponseDto } from "./user-course.response.dto";

/**
 * User courses response DTO
 * @description User courses response DTO which is used to return the user courses information.
 */
export class UserCoursesResponseDto {
  /** The user courses */
  userCourses: UserCourseResponseDto[];

  /** The total count of the user courses */
  totalCount: number;
}
