// import dependencies
import { ApiProperty } from "@nestjs/swagger";

// import dto
import { BookProgressDto } from "@/modules/reading/dto/book-progress.dto";

/**
 * This dto is used to store the user books response.
 */
export class UserBooksResponseDto {
  @ApiProperty({ description: "The books", type: [BookProgressDto] })
  books: BookProgressDto[];

  @ApiProperty({
    description: "The total count of the books",
    type: Number,
  })
  totalCount: number;
}
