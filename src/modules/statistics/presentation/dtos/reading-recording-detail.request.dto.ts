// import dependencies
import { IsDate, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Reading recording detail request DTO
 * @description Reading recording detail request DTO
 * which is used to validate the reading recording detail request.
 */
export class ReadingRecordingDetailRequestDto {
  /** The start date of the reading recording detail */
  @IsOptional()
  @IsDate()
  startDate?: Date;

  /** The end date of the reading recording detail */
  @IsOptional()
  @IsDate()
  endDate?: Date;

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
