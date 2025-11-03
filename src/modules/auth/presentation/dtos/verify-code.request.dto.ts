import { IsNotEmpty, IsString } from "class-validator";

/**
 * Verify code request DTO
 * @description Verify code request DTO which is used to validate the verify code request.
 */
export class VerifyCodeRequestDto {
  /** The code to verify */
  @IsString()
  @IsNotEmpty()
  code: string;

  /** The reset token */
  @IsString()
  @IsNotEmpty()
  resetToken: string;
}
