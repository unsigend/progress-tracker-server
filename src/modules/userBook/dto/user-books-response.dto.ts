// import dependencies
import { ApiProperty } from "@nestjs/swagger";

// import dto
import { BookResponseDto } from "@modules/book/dto/book-response.dto";
import { UserBookResponseDto } from "@modules/userBook/dto/user-book-response.dto";

/**
 * This dto is used to store the user books response.
 */
export class UserBooksResponseDto {
  @ApiProperty({
    description: "The books",
    type: "array",
    items: {
      type: "object",
      properties: {
        book: { $ref: "#/components/schemas/BookResponseDto" },
        userBook: { $ref: "#/components/schemas/UserBookResponseDto" },
      },
    },
  })
  books: Array<{
    book: BookResponseDto;
    userBook: UserBookResponseDto;
  }>;

  @ApiProperty({
    description: "The total count of the books",
    type: Number,
  })
  totalCount: number;
}
