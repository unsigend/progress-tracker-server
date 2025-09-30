// import dependencies
import { ApiProperty } from "@nestjs/swagger";

// import dto
import { UserBookResponseDto } from "./user-book-response.dto";
import { BookResponseDto } from "@/modules/book/dto/book-response.dto";
/**
 * This dto is used to store the composite book progress.
 */
export class BookProgressDto {
  @ApiProperty({ description: "book data" })
  book: BookResponseDto;

  @ApiProperty({ description: "user book data" })
  userBook: UserBookResponseDto;
}
