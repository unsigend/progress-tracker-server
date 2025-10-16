// import dependencies
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";

export class ResetPasswordRequestDto {
  @ApiProperty({ description: "The reset password token" })
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty({ description: "The verification code" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({ description: "The new password", required: false })
  @IsString()
  @IsOptional()
  @ValidateIf((object: ResetPasswordRequestDto) => object.newPassword !== "")
  @MinLength(8)
  @MaxLength(20)
  newPassword?: string;
}
