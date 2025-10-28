// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Create user book request dto
 * @description Create user book request dto which is used to create a user book.
 */
export class UserBookCreateRequestDto {
  /** The book id of the user book */
  @IsNotEmpty()
  @IsString()
  bookId: string;
}
