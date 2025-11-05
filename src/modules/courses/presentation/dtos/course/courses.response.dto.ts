import { CourseResponseDto } from "./course.response.dto";

/**
 * Courses response DTO
 * @description Courses response DTO which is used to return the courses information.
 */
export class CoursesResponseDto {
  /** The courses */
  courses: CourseResponseDto[];

  /** The total count of the courses */
  totalCount: number;
}
