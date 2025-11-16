import { IsNotEmpty, IsString } from "class-validator";

/**
 * Delete user course request DTO
 * @description Delete user course request DTO which is used to validate the delete user course request.
 */
export class UserCourseDeleteRequestDto {
  /** The id of the user course */
  @IsNotEmpty()
  @IsString()
  id: string;
}
