// import dependencies
import {
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  MaxLength,
  Min,
  Max,
} from "class-validator";

// import transformer
import { Transform } from "class-transformer";

export class QueryBookDto {
  /**
   * The search query could be title, author, or ISBN
   */
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : undefined,
  )
  @IsString()
  @IsOptional()
  @MaxLength(255, { message: "Search must be less than 255 characters" })
  search?: string = "";

  /**
   * The page number for pagination
   */
  @Transform(({ value }) => (value ? parseInt(String(value), 10) : undefined))
  @IsNumber()
  @IsOptional()
  @Min(1, { message: "Page must be greater than 0" })
  page?: number = 1;

  /**
   * The limit of books per page
   */
  @Transform(({ value }) => (value ? parseInt(String(value), 10) : undefined))
  @IsNumber()
  @IsOptional()
  @Min(1, { message: "Limit must be greater than 0" })
  @Max(100, { message: "Limit must be less than 100" })
  limit?: number = 10;

  /**
   * The field to sort by
   */
  @IsString()
  @IsOptional()
  @IsIn(["title", "createdAt"], {
    message: "Sorted by must be title or createdAt",
  })
  sortedBy?: string = "createdAt";

  /**
   * The order to sort by
   */
  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"], { message: "Sort order must be asc or desc" })
  sortOrder?: string = "desc";
}
