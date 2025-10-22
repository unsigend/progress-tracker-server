// import dependencies
import {
  IsEmail,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
} from "class-validator";
import { UserRole } from "@/domain/entities/user.entity";

/**
 * Create user request dto
 * @description Create user request dto
 */
export class CreateUserRequestDto {
  /** The username of the user */
  @IsNotEmpty()
  @IsString()
  username: string;

  /** The email of the user */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /** The password of the user (8-128 characters) */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  /** The provider of the user (local, google, github) */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(["local", "google", "github"], { each: true })
  provider?: string[] | null;

  /** The role of the user */
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole | null;

  /** The avatar image file (JPEG, PNG, GIF, or WebP, max 10MB) */
  @IsOptional()
  avatar?: Express.Multer.File | null;
}
