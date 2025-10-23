// import dependencies
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

/**
 * User book add record request dto
 * @description User book add record request dto
 */
export class UserBookAddRecordRequestDto {
  /** The date of the record */
  @IsNotEmpty()
  @IsDate()
  date: Date;

  /** The pages of the record */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3000)
  pages: number;

  /** The minutes of the record */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(600)
  minutes: number;

  /** The notes of the record */
  @IsOptional()
  @IsString()
  notes?: string | null;
}
