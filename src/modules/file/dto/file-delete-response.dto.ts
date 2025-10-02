// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * This dto is used to store the file delete response.
 */
export class FileDeleteResponseDto {
  @ApiProperty({ description: "Whether the file was deleted successfully" })
  success: boolean;
}
