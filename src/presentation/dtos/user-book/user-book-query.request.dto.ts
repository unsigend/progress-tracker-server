// import dependencies
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

/**
 * User book query request DTO
 * @description User book query request DTO
 */
export class UserBookQueryRequestDto {
  /** The user id of the query */
  @IsOptional()
  @IsUUID()
  userId?: string;

  /** The book id of the query */
  @IsOptional()
  @IsUUID()
  bookId?: string;

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
  limit?: number;

  /** The page of the query */
  @IsOptional()
  @IsNumber()
  page?: number;
}
