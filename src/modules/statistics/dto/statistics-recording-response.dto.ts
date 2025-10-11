// import dependencies
import { ApiProperty } from "@nestjs/swagger";

// import dto
import { RecordingResponseDto } from "@modules/userBook/dto/recording-response.dto";

/**
 * This dto is used to store the statistics recording response.
 */
export class StatisticsRecordingResponseDto {
  @ApiProperty({
    description: "The recordings",
    type: "array",
    items: { $ref: "#/components/schemas/RecordingResponseDto" },
  })
  recordings: RecordingResponseDto[];

  @ApiProperty({
    description: "The total count of recordings",
    type: Number,
  })
  totalCount: number;
}
