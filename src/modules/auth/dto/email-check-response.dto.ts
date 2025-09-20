// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class EmailCheckResponseDto {
  @ApiProperty({ description: "Whether the email exists" })
  exists: boolean;
}
