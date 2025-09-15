// import dependencies
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl,
  IsArray,
} from "class-validator";

/**
 * Update user DTO
 *
 * @remarks This DTO is used to update a user
 */
export class UpdateUserDto {
  /**
   * The full name of the user
   * @example "John Doe"
   */
  @IsString()
  @IsOptional()
  @MinLength(3, { message: "Name must be at least 3 characters" })
  @MaxLength(64, { message: "Name must be less than 64 characters" })
  name?: string;

  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsOptional()
  email?: string;

  /**
   * The new password for the user account
   * @example "newSecurePassword123"
   */
  @IsString()
  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(255, { message: "Password must be less than 255 characters" })
  password?: string;

  /**
   * The URL of the user's avatar
   * @example "https://example.com/avatar.jpg"
   */
  @IsOptional()
  @IsUrl({}, { message: "Avatar URL must be a valid URL" })
  avatarURL?: string;

  /**
   * The providers of the user
   * @example ["local", "google", "github"]
   */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  provider?: string[];
}
