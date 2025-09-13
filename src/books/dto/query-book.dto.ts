// import dependencies
import { IsString, IsNumber, IsOptional, IsIn } from "class-validator";

export class QueryBookDto {
  /**
   * The search query could be title, author, or ISBN
   */
  @IsString()
  @IsOptional()
  search?: string = "";

  /**
   * The page number for pagination (default: 1)
   */
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  /**
   * The limit of books per page
   */
  @IsNumber()
  @IsOptional()
  limit?: number = 10;

  /**
   * The field to sort by (default: createdAt)
   */
  @IsString()
  @IsOptional()
  @IsIn(["title", "createdAt"])
  sortedBy?: string = "createdAt";

  /**
   * The order to sort by (default: desc)
   */
  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: string = "desc";
}
