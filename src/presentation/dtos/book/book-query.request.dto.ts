// import dependencies
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  Min,
} from "class-validator";

/**
 * Book query request dto
 * @description Book query request dto
 */
export class BookQueryRequestDto {
  /** The key to be used to query the books */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  key?: string;

  /** The value to be used to query the books */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value?: string;

  /** The sort of the query */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
