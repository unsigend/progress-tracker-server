// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

/**
 * This dto is used to store the file delete request.
 */
export class FileDeleteRequestDto {
  @ApiProperty({ description: "The file url" })
  @IsString()
  @IsNotEmpty()
  file_url: string;
}
