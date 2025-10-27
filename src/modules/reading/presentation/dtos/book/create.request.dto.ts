// import dependencies
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Create book request DTO
 * @description Create book request DTO which is used to validate the create book request.
 */
export class CreateBookRequestDto {
  /** The title of the book */
  @IsString()
  @IsNotEmpty()
  title: string;

  /** The author of the book */
  @IsString()
  @IsOptional()
  author?: string;

  /** The pages of the book */
  @IsNumber()
  @IsNotEmpty()
  pages: number;

  /** The description of the book */
  @IsString()
  @IsOptional()
  description?: string;

  /** The ISBN10 of the book */
  @IsString()
  @IsOptional()
  ISBN10?: string;

  /** The ISBN13 of the book */
  @IsString()
  @IsOptional()
  ISBN13?: string;

  /** The cover image file of the book */
  @IsOptional()
  coverImage?: Express.Multer.File;
}
