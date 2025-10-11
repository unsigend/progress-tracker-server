// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * This dto is used to store the recording response.
 */
export class RecordingResponseDto {
  @ApiProperty({ description: "The recording id" })
  id: string;

  @ApiProperty({ description: "The user book id" })
  user_book_id: string;

  @ApiProperty({ description: "The date of the recording" })
  date: Date;

  @ApiProperty({ description: "The pages of the recording" })
  pages: number;

  @ApiProperty({ description: "The minutes of the recording" })
  minutes: number;

  @ApiProperty({ description: "The notes of the recording" })
  notes: string | null;
}
