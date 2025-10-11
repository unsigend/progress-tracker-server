// import dependencies
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

/**
 * This dto is used to store the query statistics reading dto.
 */
export class StatisticsRecordingQueryDto {
  @ApiPropertyOptional({
    description: "The start date of the recordings",
    type: Date,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date | null;

  @ApiPropertyOptional({
    description: "date limit",
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  dateLimit?: number | null;

  @ApiPropertyOptional({
    description: "User Book ID if not provided, will use all user books",
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  userBookID?: string | null;
}
