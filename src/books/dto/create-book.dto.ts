import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBookDto {
  /**
   * The title of the book
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * The author of the book
   */
  @IsString()
  @IsOptional()
  author?: string;

  /**
   * The description of the book
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * The number of pages in the book
   */
  @IsNumber()
  @IsOptional()
  pages?: number;

  /**
   * The URL of the book's image
   */
  @IsString()
  @IsOptional()
  imageURL?: string;

  /**
   * The ISBN of the book (ISBN-10 or ISBN-13)
   */
  @IsString()
  @IsOptional()
  ISBN?: string;
}
