// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

/**
 * File delete request dto
 * @description File delete request dto
 */
export class FileDeleteRequestDto {
  @ApiProperty({
    description: "The URL of the file to be deleted",
    example: "https://example.com/file.jpg",
    type: "string",
    format: "uri",
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}
