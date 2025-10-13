// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordRequestDto {
  @ApiProperty({ description: "The reset password token" })
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty({ description: "The verification code" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: "The new password" })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
