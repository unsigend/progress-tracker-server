// import dependencies
import { ApiProperty } from "@nestjs/swagger";

// import dto
import { BookResponseDto } from "@modules/book/dto/book-response.dto";

export class BooksResponseDto {
  @ApiProperty({ type: [BookResponseDto], description: "The book list" })
  books: BookResponseDto[];

  @ApiProperty({ description: "The total count of the books" })
  totalCount: number;
}
