// import dependencies
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ReadingStatus } from "@prisma/client";

/**
 * This dto is used to store the query tracked book dto.
 */
export class QueryTrackedBookDto {
  @ApiPropertyOptional({
    description: "The search value for status",
    type: ReadingStatus,
    enum: ReadingStatus,
    enumName: "ReadingStatus",
    example: ReadingStatus.NOT_STARTED,
  })
  @IsString()
  @IsOptional()
  value?: ReadingStatus | null;
}
