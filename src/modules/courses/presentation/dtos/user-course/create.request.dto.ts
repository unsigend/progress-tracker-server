import { IsNotEmpty, IsString } from "class-validator";

/**
 * Create user course request DTO
 * @description Create user course request DTO which is used to validate the create user course request.
 */
export class UserCourseCreateRequestDto {
  /** The course id of the user course */
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
