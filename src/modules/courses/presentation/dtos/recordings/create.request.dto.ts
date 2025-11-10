import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

/**
 * Create course recordings request DTO
 * @description Create course recordings request DTO which is used to validate the create course recordings request.
 */
export class CourseRecordingCreateRequestDto {
  /** The date of the course recording */
  @IsDate()
  @IsNotEmpty()
  date: Date;

  /** The minutes of the course recording */
  @IsNumber()
  @IsNotEmpty()
  minutes: number;

  /** The record type of the course recording */
  @IsString()
  @IsNotEmpty()
  recordType: string;

  /** The notes of the course recording */
  @IsString()
  @IsOptional()
  notes?: string;
}
