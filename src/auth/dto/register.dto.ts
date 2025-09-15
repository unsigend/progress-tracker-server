// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsOptional,
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
   * The full name of the user
   * @example "John Doe"
   */
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(3, { message: "Name must be at least 3 characters" })
  @MaxLength(64, { message: "Name must be less than 64 characters" })
  name: string;

  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  /**
   * The password for the user account
   * @example "mySecurePassword123"
   */
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(255, { message: "Password must be less than 255 characters" })
  password: string;

  /**
   * The URL of the user's avatar
   * @example "https://example.com/avatar.jpg"
   */
  @IsString()
  @IsOptional()
  avatarURL?: string = "";

  /**
   * The providers of the user
   * @example ["local", "google", "github"]
   */
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  provider?: string[] = ["local"];
}
