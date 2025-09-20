// import dependencies
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  MaxLength,
  IsISBN,
  Min,
  Max,
  IsUrl,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { TrimString } from "@common/transform/trim-string";

export class CreateBookDto {
  @ApiProperty({ description: "The title of the book", type: String })
  @TrimString()
  @IsString({ message: "Title must be a string" })
  @IsNotEmpty({ message: "Title is required" })
  title: string;

  @ApiPropertyOptional({ description: "The author of the book", type: String })
  @TrimString()
  @IsString({ message: "Author must be a string" })
  @IsOptional()
  author?: string | null;

  @ApiProperty({ description: "The description of the book", type: String })
  @TrimString()
  @IsString({ message: "Description must be a string" })
  @IsOptional()
  @MaxLength(1000)
  description?: string | null;

  @ApiPropertyOptional({ description: "The ISBN10 of the book", type: String })
  @TrimString()
  @IsString({ message: "ISBN10 must be a string" })
  @IsOptional()
  @IsISBN(10, { message: "Invalid ISBN10" })
  ISBN10?: string | null;

  @ApiPropertyOptional({ description: "The ISBN13 of the book", type: String })
  @TrimString()
  @IsString({ message: "ISBN13 must be a string" })
  @IsISBN(13, { message: "Invalid ISBN13" })
  @IsOptional()
  ISBN13?: string | null;

  @ApiPropertyOptional({ description: "The pages of the book", type: Number })
  @Type(() => Number)
  @IsInt({ message: "Pages must be an integer" })
  @IsOptional()
  @Min(1, { message: "Pages must be greater than 0" })
  @Max(10000, { message: "Pages must be less than 10000" })
  pages?: number | null;

  @ApiPropertyOptional({
    description: "The cover url of the book",
    type: String,
  })
  @TrimString()
  @IsString({ message: "Cover url must be a string" })
  @IsOptional()
  @IsUrl(undefined, { message: "Invalid cover url" })
  cover_url?: string | null;
}
