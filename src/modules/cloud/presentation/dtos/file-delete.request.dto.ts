// import dependencies
import { IsNotEmpty, IsUrl } from "class-validator";

/**
 * File delete request DTO
 * @description DTO for the file delete request
 */
export class FileDeleteRequestDto {
  /** The URL of the file to delete */
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
