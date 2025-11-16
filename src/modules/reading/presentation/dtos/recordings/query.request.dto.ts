// import dependencies
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Book recording query request dto
 * @description Book recording query request dto which is used to validate the book recording query request.
 */
export class BookRecordingQueryRequestDto {
  /** The limit to query */
  @IsOptional()
  @IsNumber()
  limit?: number;

  /** The page to query */
  @IsOptional()
  @IsNumber()
  page?: number;

  /** The sort to query */
  @IsOptional()
  @IsString()
  sort?: string;

  /** The order to query */
  @IsOptional()
  @IsIn(["asc", "desc"] as const)
  order?: "asc" | "desc";
}
