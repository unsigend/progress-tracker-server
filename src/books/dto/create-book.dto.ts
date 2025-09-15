// import dependencies
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
  IsUrl,
  IsISBN,
  MaxLength,
  MinLength,
} from "class-validator";

// import transformer
import { Transform } from "class-transformer";

export class CreateBookDto {
  /**
   * The title of the book
   * @example "The Great Gatsby"
   */
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : undefined,
  )
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: "Title must be at least 1 character" })
  @MaxLength(255, { message: "Title must be less than 255 characters" })
  title: string;

  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : undefined,
  )
  @IsString()
  @IsOptional()
  author?: string;

  /**
   * The description of the book
   * @example "A classic American novel set in the Jazz Age"
   */
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : undefined,
  )
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * The number of pages in the book
   * @example 180
   */
  @Transform(({ value }) => (value ? parseInt(String(value), 10) : undefined))
  @IsNumber()
  @IsOptional()
  @Min(1, { message: "Pages must be greater than 0" })
  @Max(3000, { message: "Pages must be less than 3000" })
  pages?: number;

  /**
   * The URL of the book's cover image
   * @example "https://example.com/book-cover.jpg"
   */
  @IsString()
  @IsOptional()
  @IsUrl({}, { message: "Image URL must be a valid URL" })
  imageURL?: string;

  /**
   * The ISBN of the book (ISBN-10 or ISBN-13)
   * @example "978-0-7432-7356-5"
   */
  @IsString()
  @IsOptional()
  @IsISBN(undefined, { message: "ISBN must be a valid ISBN-10 or ISBN-13" })
  ISBN?: string;
}
