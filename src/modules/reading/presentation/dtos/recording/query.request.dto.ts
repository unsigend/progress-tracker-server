// import dependencies
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Recording query request dto
 * @description Recording query request dto which is used to validate the recording query request.
 */
export class RecordingQueryRequestDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsIn(["asc", "desc"] as const)
  order?: "asc" | "desc";
}
