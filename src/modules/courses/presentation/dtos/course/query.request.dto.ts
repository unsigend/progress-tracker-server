import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Course query request DTO
 * @description Course query request DTO which is used to validate the course query request.
 */
export class CourseQueryRequestDto {
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
