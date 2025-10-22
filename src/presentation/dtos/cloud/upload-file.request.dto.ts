// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * Upload file request DTO
 * @description Upload file request DTO
 */
export class UploadFileRequestDto {
  @ApiProperty({
    description: "The file to be uploaded",
    type: "string",
    format: "binary",
  })
  file: Express.Multer.File;
}
