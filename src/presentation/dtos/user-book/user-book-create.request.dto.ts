// import dependencies
import { IsNotEmpty, IsUUID } from "class-validator";

/**
 * User book create request dto
 * @description User book create request dto
 */
export class UserBookCreateRequestDto {
  /** The book id of the user book */
  @IsNotEmpty()
  @IsUUID()
  bookId: string;
}
