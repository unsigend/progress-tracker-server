import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

/**
 * User course query request DTO
 * @description User course query request DTO which is used to validate the user course query request.
 */
export class UserCourseQueryRequestDto {
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
  @IsIn(["createdAt", "updatedAt", "completedDate", "startDate"] as const)
  sort?: "createdAt" | "updatedAt" | "completedDate" | "startDate";

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

  /** The expand to query */
  @IsOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  expand: boolean = false;
}
