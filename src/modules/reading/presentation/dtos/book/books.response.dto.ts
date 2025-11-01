// import dependencies
import { BookResponseDto } from "./book.response.dto";

/**
 * Books response DTO
 * @description Books response DTO which is used to return the books information.
 */
export class BooksResponseDto {
  /** The books of the books */
  books: BookResponseDto[];

  /** The total count of the books */
  totalCount: number;
}
