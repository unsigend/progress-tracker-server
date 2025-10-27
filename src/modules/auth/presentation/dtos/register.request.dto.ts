// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

/**
 * Register request DTO
 * @description Register request DTO which is used to validate the register request.
 */
export class RegisterRequestDto {
  /** The username of the user */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  username: string;

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
