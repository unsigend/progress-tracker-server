// import dependencies
import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * Email check DTO
 *
 * @remarks This DTO is used to check if an email is already in use
 */
export class EmailCheckDto {
  /**
   * The email to check
   */
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;
}
