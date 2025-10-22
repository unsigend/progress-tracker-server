// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * Email check response dto
 * @description Email check response dto
 */
export class EmailCheckResponseDto {
  @ApiProperty({
    description: "Whether the email exists",
    example: true,
    type: Boolean,
  })
  exists: boolean;
}
