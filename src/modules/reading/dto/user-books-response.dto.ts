// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { UserBookResponseDto } from "@modules/reading/dto/user-book-response.dto";

/**
 * This dto is used to store the user books response.
 */
export class UserBooksResponseDto {
  @ApiProperty({ description: "The user books", type: [UserBookResponseDto] })
  userBooks: UserBookResponseDto[];

  @ApiProperty({
    description: "The total count of the user books",
    type: Number,
  })
  totalCount: number;
}
