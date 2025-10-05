// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * This dto is used to update the user book.
 */
export class UserBookUpdateDto {
  @ApiProperty({ description: "The added pages of the user book" })
  pages: number;

  @ApiProperty({ description: "The added minutes of the user book" })
  minutes: number;

  @ApiProperty({ description: "The added days of the user book" })
  days: number;
}
