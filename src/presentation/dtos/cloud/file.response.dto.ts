// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * File response dto
 * @description File response dto
 */
export class FileResponseDto {
  @ApiProperty({
    description: "The file URL",
    example: "https://example.com/file.jpg",
    type: String,
  })
  url: string;
}
