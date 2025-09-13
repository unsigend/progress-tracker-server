// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

/**
 * Register DTO
 *
 * @remarks This DTO is used to register a user
 */
export class RegisterDto {
  /**
   * The name of the user
   */
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(3, { message: "Name must be at least 3 characters" })
  @MaxLength(64, { message: "Name must be less than 64 characters" })
  name: string;

  /**
   * The email of the user
   */
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  /**
   * The password of the user
   */
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(255, { message: "Password must be less than 255 characters" })
  password: string;
}
