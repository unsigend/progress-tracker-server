// import dependencies
import {
  IsDate,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsString,
} from "class-validator";

/**
 * Reading recording update request dto
 * @description Reading recording update request dto
 */
export class ReadingRecordingUpdateRequestDto {
  /** The date of the reading recording */
  @IsOptional()
  @IsDate()
  date?: Date | null;

  /** The pages of the reading recording */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(3000)
  pages?: number | null;

  /** The minutes of the reading recording */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(600)
  minutes?: number | null;

  /** The notes of the reading recording */
  @IsOptional()
  @IsString()
  notes?: string | null;
}
