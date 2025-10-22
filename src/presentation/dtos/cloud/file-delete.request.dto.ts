// import dependencies
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

/**
 * File delete request dto
 * @description File delete request dto
 */
export class FileDeleteRequestDto {
  /** The URL of the file to be deleted */
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}
