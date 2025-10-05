// import dependencies
import { ApiProperty } from "@nestjs/swagger";

// import dto
import { RecordingResponseDto } from "@/modules/reading/readingRecording/dto/recording-response.dto";

export class RecordingsResponseDto {
  @ApiProperty({ description: "The recordings", type: [RecordingResponseDto] })
  recordings: RecordingResponseDto[];

  @ApiProperty({ description: "The total count of the recordings" })
  totalCount: number;
}
