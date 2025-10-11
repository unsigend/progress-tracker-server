// import dependencies
import { Controller, Get, Query } from "@nestjs/common";

// import services
import { StatisticsService } from "@modules/statistics/statistics.service";

// import decorators
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

// import dto
import { StatisticsRecordingQueryDto } from "@modules/statistics/dto/statistics-recording-query.dto";
import { StatisticsRecordingResponseDto } from "@modules/statistics/dto/statistics-recording-response.dto";

/**
 * This controller is used to store the statistics.
 */
@ApiTags("Statistics")
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * Get the statistics of the recordings
   * @param query - The query to get the statistics of the recordings
   * @returns The statistics of the recordings
   * @public
   */
  @ApiOperation({ summary: "Get the statistics of the recordings" })
  @ApiOkResponse({ type: StatisticsRecordingResponseDto })
  @ApiNotFoundResponse({ description: "Recordings not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("recordings")
  public async getRecordingsStatistics(
    @Query() query: StatisticsRecordingQueryDto,
  ): Promise<StatisticsRecordingResponseDto> {
    return this.statisticsService.getRecordingsStatistics(query);
  }
}
