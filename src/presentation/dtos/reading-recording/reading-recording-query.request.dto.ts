// import dependencies
import {
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

/**
 * Reading recording query request DTO
 * @description Reading recording query request DTO
 */
export class ReadingRecordingQueryRequestDto {
  /** The date of the reading recording */
  @IsOptional()
  @IsDate()
  date?: Date;

  /** The sort of the reading recording */
  @IsOptional()
  @IsString()
  sort?: string;

  /** The order of the reading recording */
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";

  /** The limit of the reading recording */
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  /** The page of the reading recording */
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;
}
