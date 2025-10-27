// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

/**
 * Login request DTO
 * @description Login request DTO which is used to validate the login request.
 */
export class LoginRequestDto {
  /** The email of the user */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** The password of the user */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
