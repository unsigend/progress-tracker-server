// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordResponseDto {
  @ApiProperty({ description: "The success message", type: String })
  message: string;

  @ApiProperty({
    description: "Whether the password was reset successfully",
    type: Boolean,
  })
  success: boolean;
}
