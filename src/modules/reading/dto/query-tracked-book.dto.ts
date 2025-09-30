// import dependencies
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ReadingStatus } from "@prisma/client";
import { IsOptional, IsEnum } from "class-validator";

/**
 * This dto is used to store the query tracked book dto.
 */
export class QueryTrackedBookDto {
  @ApiPropertyOptional({
    description: "the status of the book",
    example: "NOT_STARTED",
    enum: ReadingStatus,
    enumName: "ReadingStatus",
  })
  @IsEnum(ReadingStatus)
  @IsOptional()
  status?: ReadingStatus | null;
}
