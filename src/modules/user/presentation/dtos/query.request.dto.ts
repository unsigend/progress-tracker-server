import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

/**
 * User query request DTO
 * @description User query request DTO which is used to validate the user query request.
 */
export class UserQueryRequestDto {
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
  @Min(1)
  limit?: number;

  /** The page to query */
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;
}
