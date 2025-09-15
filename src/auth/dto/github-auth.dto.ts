// import dependencies
import { IsString, IsNotEmpty } from "class-validator";

/**
 * Github auth DTO
 *
 * @remarks This DTO is used to authenticate a user with github
 */
export class GithubAuthDto {
  /**
   * The code from github
   * @example "1234567890"
   */
  @IsString()
  @IsNotEmpty({ message: "Code is required" })
  code: string;
}
