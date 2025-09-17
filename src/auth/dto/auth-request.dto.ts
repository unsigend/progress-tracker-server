// import dependencies
import { IsString, IsNotEmpty } from "class-validator";

/**
 * Auth request DTO for third party authentication
 * for github, google, etc.
 *
 * @remarks This DTO is used to authenticate a user with third party authentication
 */
export class AuthRequestDto {
  /**
   * The code from third party authentication
   * @example "1234567890"
   */
  @IsString()
  @IsNotEmpty({ message: "Code is required" })
  code: string;
}
