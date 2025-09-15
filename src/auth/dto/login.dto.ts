// import dependencies
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Login DTO
 *
 * @remarks This DTO is used to login a user
 */
export class LoginDto {
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  /**
   * The password of the user
   * @example "mySecurePassword123"
   */
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
