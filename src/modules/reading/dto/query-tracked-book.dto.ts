// import dependencies
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

/**
 * This dto is used to store the query tracked book dto.
 */
export class QueryTrackedBookDto {
  @ApiPropertyOptional({ description: "The search field", type: String })
  @IsString()
  @IsOptional()
  field?: string | null;

  @ApiPropertyOptional({ description: "The search value", type: String })
  @IsString()
  @IsOptional()
  value?: string | null;
}
