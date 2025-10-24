// import dependencies
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  Max,
  Min,
  IsOptional,
  IsISBN,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * Book create request dto
 * @description Book create request dto
 */
export class BookCreateRequestDto {
  /** The title of the book */
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  /** The pages of the book */
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(3000)
  pages: number;

  /** The author of the book */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  author?: string | null;

  /** The description of the book */
  @IsOptional()
  @IsString()
  description?: string | null;

  /** The ISBN 10 of the book */
  @IsOptional()
  @IsString()
  @IsISBN(10)
  isbn10?: string | null;

  /** The ISBN 13 of the book */
  @IsOptional()
  @IsString()
  @IsISBN(13)
  isbn13?: string | null;

  /** The cover image file (JPEG, PNG, GIF, or WebP, max 10MB) */
  @IsOptional()
  cover?: Express.Multer.File | null;
}
