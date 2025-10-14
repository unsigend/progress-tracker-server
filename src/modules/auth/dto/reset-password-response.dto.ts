// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordResponseDto {
  @ApiProperty({ description: "The result message", type: String })
  message: string;

  @ApiProperty({
    description: "Whether the password was reset successfully",
    type: Boolean,
  })
  reset_success: boolean;

  @ApiProperty({
    description: "Whether the verification code is valid",
    type: Boolean,
  })
  valid: boolean;
}
