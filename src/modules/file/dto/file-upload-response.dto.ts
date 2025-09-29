// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class FileUploadResponseDto {
  @ApiProperty({ description: "The file url", type: String })
  file_url: string;

  @ApiProperty({
    type: Boolean,
    description: "Whether the file was uploaded successfully",
  })
  success: boolean;
}
