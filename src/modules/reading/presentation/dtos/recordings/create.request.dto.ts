// import dependencies
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

/**
 * Create book recording request DTO
 * @description Create book recording request DTO which is used to create a book recording.
 */
export class BookRecordingCreateRequestDto {
  /** The date of the recording */
  @IsDate()
  @IsNotEmpty()
  date: Date;

  /** The pages of the recording */
  @IsNumber()
  @IsNotEmpty()
  pages: number;

  /** The minutes of the recording */
  @IsNumber()
  @IsNotEmpty()
  minutes: number;

  /** The notes of the recording */
  @IsString()
  @IsOptional()
  notes?: string;
}
