// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

/**
 * Login request dto
 * @description Login request dto
 */
export class LoginRequestDto {
  /** The email of the user */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /** The password of the user */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
