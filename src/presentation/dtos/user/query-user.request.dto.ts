import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

/**
 * Query user request dto
 * @description Query user request dto
 */
export class QueryUserRequestDto {
  /** The key of the query */
  @IsOptional()
  @IsString()
  key?: string;

  /** The value of the query */
  @IsOptional()
  @IsString()
  value?: string;

  /** The sort of the query */
  @IsOptional()
  @IsString()
  sort?: string;

  /** The order of the query */
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";

  /** The limit of the query */
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  /** The page of the query */
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;
}
