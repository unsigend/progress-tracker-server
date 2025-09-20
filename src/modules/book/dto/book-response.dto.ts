// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class BookResponseDto {
  @ApiProperty({ description: "The unique identifier of the book" })
  id: string;

  @ApiProperty({ description: "The title of the book", type: String })
  title: string;

  @ApiProperty({ description: "The author of the book", type: String })
  author: string | null;

  @ApiProperty({ description: "The description of the book", type: String })
  description: string | null;

  @ApiProperty({ description: "The ISBN10 of the book", type: String })
  ISBN10: string | null;

  @ApiProperty({ description: "The ISBN13 of the book", type: String })
  ISBN13: string | null;

  @ApiProperty({ description: "The pages of the book", type: Number })
  pages: number | null;

  @ApiProperty({ description: "The cover url of the book", type: String })
  cover_url: string | null;

  @ApiProperty({ description: "The created at date of the book", type: Date })
  createdAt: Date;

  @ApiProperty({ description: "The updated at date of the book", type: Date })
  updatedAt: Date;
}
