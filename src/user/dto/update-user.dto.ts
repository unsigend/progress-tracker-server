// import dependencies
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
} from "class-validator";

/**
 * Update user DTO
 *
 * @remarks This DTO is used to update a user
 */
export class UpdateUserDto {
  /**
   * The name of the user
   */
  @IsString()
  @IsOptional()
  @MinLength(3, { message: "Name must be at least 3 characters" })
  @MaxLength(64, { message: "Name must be less than 64 characters" })
  name?: string;

  /**
   * The email of the user
   */
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsOptional()
  email?: string;

  /**
   * The password of the user
   */
  @IsString()
  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(255, { message: "Password must be less than 255 characters" })
  password?: string;
}
