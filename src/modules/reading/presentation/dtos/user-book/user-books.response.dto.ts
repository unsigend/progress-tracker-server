// import dependencies
import { UserBookResponseDto } from "./user-book.response.dto";
/**
 * User books response dto
 * @description User books response dto which is used to return the user books information.
 */
export class UserBooksResponseDto {
  /** The user books */
  userBooks: UserBookResponseDto[];

  /** The total count of the user books */
  totalCount: number;
}
