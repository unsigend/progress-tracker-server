// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

/**
 * This dto is used to track a book
 */
export class TrackBookRequestDto {
  @ApiProperty({ description: "The book id to track" })
  @IsString()
  @IsNotEmpty()
  book_id: string;
}
