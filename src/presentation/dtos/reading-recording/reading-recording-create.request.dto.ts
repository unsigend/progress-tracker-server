// import dependencies
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * Reading recording create request dto
 * @description Reading recording create request dto
 */
export class ReadingRecordingCreateRequestDto {
  /** The date of the reading recording */
  @IsNotEmpty()
  @IsDate()
  date: Date;

  /** The pages of the reading recording */
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(3000)
  pages: number;

  /** The minutes of the reading recording */
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(600)
  minutes: number;

  /** The notes of the reading recording */
  @IsOptional()
  @IsString()
  notes?: string | null;
}
