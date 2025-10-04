// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { ReadingStatus } from "@prisma/client";

/**
 * This dto is used to store the user book response.
 */
export class UserBookResponseDto {
  @ApiProperty({ description: "The unique identifier of the user book" })
  id: string;

  @ApiProperty({ description: "The book id of the user book" })
  book_id: string;

  @ApiProperty({ description: "The user id of the user book" })
  user_id: string;

  @ApiProperty({ description: "The status of the user book" })
  status: ReadingStatus;

  @ApiProperty({ description: "The current page of the user book" })
  current_page: number;

  @ApiProperty({ description: "The start date of the user book" })
  start_date: Date;

  @ApiProperty({ description: "The completed date of the user book" })
  completed_date: Date;

  @ApiProperty({ description: "The total minutes of the user book" })
  total_minutes: number;

  @ApiProperty({ description: "The total days of the user book" })
  total_days: number;

  @ApiProperty({ description: "The created at date of the user book" })
  createdAt: Date;

  @ApiProperty({ description: "The updated at date of the user book" })
  updatedAt: Date;
}
