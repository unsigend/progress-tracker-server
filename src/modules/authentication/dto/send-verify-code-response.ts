// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class SendVerifyCodeResponseDto {
  @ApiProperty({ description: "The reset password token" })
  resetToken: string;
}
