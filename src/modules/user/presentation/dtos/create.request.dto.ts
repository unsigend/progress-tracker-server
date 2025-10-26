// import dependencies
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { UserRole } from "../../domain/entities/user.entity";

/**
 * Create user request dto
 * @description Create user request dto
 */
export class CreateUserRequestDto {
  /** The username of the user */
  @IsString()
  @IsNotEmpty()
  username: string;

  /** The email of the user */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** The password of the user */
  @IsString()
  @IsNotEmpty()
  password: string;

  /** The role of the user */
  @IsEnum(UserRole)
  @IsNotEmpty()
  role?: UserRole;

  /** The avatar image file of the user */
  @IsOptional()
  avatarImage?: Express.Multer.File;
}
