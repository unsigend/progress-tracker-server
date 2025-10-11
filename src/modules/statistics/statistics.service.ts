// import dependencies
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

// import services
import { PrismaService } from "@modules/database/prisma.service";

// import dto
import { StatisticsRecordingQueryDto } from "@modules/statistics/dto/statistics-recording-query.dto";
import { StatisticsRecordingResponseDto } from "@modules/statistics/dto/statistics-recording-response.dto";
import { RecordingResponseDto } from "@modules/userBook/dto/recording-response.dto";

/**
 * This service is used to store the statistics.
 */
@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get the statistics of the readings
   * @param query - The query to get the statistics of the readings
   * @returns The statistics of the readings
   */
  public async getRecordingsStatistics(
    query: StatisticsRecordingQueryDto,
  ): Promise<StatisticsRecordingResponseDto> {
    const { startDate, dateLimit, userBookID } = query;

    // Build the where clause
    const whereClause: Prisma.ReadingRecordWhereInput = {};

    // Filter by userBookID if provided
    if (userBookID) {
      whereClause.user_book_id = userBookID;
    }

    // Filter by date range if startDate and dateLimit are provided
    if (startDate && dateLimit) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + dateLimit - 1);

      whereClause.date = {
        gte: startDate,
        lte: endDate,
      };
    } else if (startDate) {
      // If only startDate is provided, get recordings from that date onwards
      whereClause.date = {
        gte: startDate,
      };
    }

    // Query recordings with the filters
    const recordings = await this.prisma.readingRecord.findMany({
      where: whereClause,
      orderBy: { date: "asc" },
    });

    return {
      recordings: recordings as RecordingResponseDto[],
      totalCount: recordings.length,
    };
  }
}
