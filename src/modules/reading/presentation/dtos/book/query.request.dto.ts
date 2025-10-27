// import dependencies
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Book query request DTO
 * @description Book query request DTO which is used to validate the book query request.
 */
export class BookQueryRequestDto {
  /** The field to query */
  @IsOptional()
  @IsString()
  field?: string;

  /** The value to query */
  @IsOptional()
  @IsString()
  value?: string;

  /** The sort to query */
  @IsOptional()
  @IsString()
  sort?: string;

  /** The order to query */
  @IsOptional()
  @IsIn(["asc", "desc"] as const)
  order?: "asc" | "desc";

  /** The limit to query */
  @IsOptional()
  @IsNumber()
  limit?: number;

  /** The page to query */
  @IsOptional()
  @IsNumber()
  page?: number;
}
