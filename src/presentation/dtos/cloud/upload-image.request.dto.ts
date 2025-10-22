// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * Upload image request dto
 * @description Upload image request dto
 */
export class UploadImageRequestDto {
  @ApiProperty({
    description: "The image to be uploaded (JPEG, PNG, GIF, or WebP, max 10MB)",
    type: "string",
    format: "binary",
  })
  image: Express.Multer.File;
}
