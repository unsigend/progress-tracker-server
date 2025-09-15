// import dependencies
import { IsString, IsNotEmpty } from "class-validator";

/**
 * Google auth DTO
 *
 * @remarks This DTO is used to authenticate a user with google
 */
export class GoogleAuthDto {
  /**
   * The code from google
   * @example "1234567890"
   */
  @IsString()
  @IsNotEmpty({ message: "Code is required" })
  code: string;
}
