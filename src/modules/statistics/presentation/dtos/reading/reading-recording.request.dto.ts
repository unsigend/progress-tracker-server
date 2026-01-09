// import dependencies
import { IsDate, IsOptional } from "class-validator";

/**
 * Reading recording request DTO
 * @description Reading recording request DTO which is used
 * to validate the reading recording request.
 */
export class ReadingRecordingRequestDto {
  /** The start date of the reading recording */
  @IsOptional()
  @IsDate()
  startDate?: Date;

  /** The end date of the reading recording */
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
