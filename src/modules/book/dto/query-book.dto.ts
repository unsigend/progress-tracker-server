// import dependencies
import { IsString, IsOptional, IsInt, Min, Max, IsIn } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class QueryBookDto {
  @ApiPropertyOptional({
    description:
      "Search term to filter books by title, author, ISBN10 or ISBN13",
    example: "",
    type: String,
  })
  @IsString({ message: "Search must be a string" })
  @IsOptional()
  search?: string | null;

  @ApiPropertyOptional({
    description: "Page number for pagination index starts from 1",
    example: 1,
    minimum: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be at least 1" })
  @IsOptional()
  page?: number | null;

  @ApiPropertyOptional({
    description: "Number of results per page (max 100)",
    example: 10,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @Type(() => Number)
  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be at least 1" })
  @Max(100, { message: "Limit cannot exceed 100" })
  @IsOptional()
  limit?: number | null;

  @ApiPropertyOptional({
    description: "Field to sort by",
    example: "createdAt",
    enum: ["title", "author", "createdAt", "updatedAt"],
    type: String,
  })
  @IsString({ message: "Sort must be a string" })
  @IsIn(["title", "author", "createdAt", "updatedAt"], {
    message: "Sort must be one of: title, author, createdAt, updatedAt",
  })
  @IsOptional()
  sort?: string | null;

  @ApiPropertyOptional({
    description: "Sort order",
    example: "desc",
    enum: ["asc", "desc"],
    type: String,
  })
  @IsString({ message: "Order must be a string" })
  @IsIn(["asc", "desc"], {
    message: "Order must be either 'asc' or 'desc'",
  })
  @IsOptional()
  order?: string | null;
}
