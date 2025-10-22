// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

/**
 * Register request dto
 * @description Register request dto
 */
export class RegisterRequestDto {
  /** The username of the user */
  @IsNotEmpty()
  @IsString()
  username: string;

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
