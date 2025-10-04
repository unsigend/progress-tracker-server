// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class RecordingResponseDto {
  @ApiProperty({ description: "The recording id" })
  id: string;

  @ApiProperty({ description: "The user book id" })
  user_book_id: string;

  @ApiProperty({ description: "The date" })
  date: Date;

  @ApiProperty({ description: "The pages" })
  pages: number;

  @ApiProperty({ description: "The minutes" })
  minutes: number;

  @ApiProperty({ description: "The notes" })
  notes: string;
}
