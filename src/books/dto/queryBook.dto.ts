// import dependencies
import { IsString, IsNumber, IsOptional, IsIn } from "class-validator";

export class QueryBookDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  @IsIn(["title", "createdAt"])
  sortedBy?: "title" | "createdAt";

  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc";
}
