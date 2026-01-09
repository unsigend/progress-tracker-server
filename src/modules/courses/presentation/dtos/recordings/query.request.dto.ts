// import dependencies
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Course recording query request DTO
 * @description Course recording query request DTO which is used to validate the course recording query request.
 */
export class CourseRecordingQueryRequestDto {
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
