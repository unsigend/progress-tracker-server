// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * Upload avatar request dto
 * @description Upload avatar request dto
 */
export class UploadAvatarRequestDto {
  @ApiProperty({
    description:
      "The avatar to be uploaded (JPEG, PNG, GIF, or WebP, max 10MB)",
    type: "string",
    format: "binary",
  })
  avatar: Express.Multer.File;
}
