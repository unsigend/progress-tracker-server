import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

/**
 * Reset password request DTO
 * @description Reset password request DTO which is used to
 * validate the reset password request.
 */
export class ResetPasswordRequestDto {
  /** The new password */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  /** The reset token */
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  /** The code to verify */
  @IsString()
  @IsNotEmpty()
  code: string;
}
