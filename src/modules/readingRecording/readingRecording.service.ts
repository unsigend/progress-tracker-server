// import dependencies
import { Injectable } from "@nestjs/common";

// import services
import { PrismaService } from "@modules/database/prisma.service";

// import dto
import { CreateRecordingDto } from "@modules/readingRecording/dto/create-recording.dto";
import { RecordingResponseDto } from "@modules/readingRecording/dto/recording-response.dto";
import { RecordingsResponseDto } from "@modules/readingRecording/dto/recordings-response.dto";

@Injectable()
export class ReadingRecordingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a recording
   * @param createRecordingDto - The data to create the recording
   * @returns The recording
   */
  async createRecording(
    createRecordingDto: CreateRecordingDto,
  ): Promise<RecordingResponseDto> {
    const recording: RecordingResponseDto =
      (await this.prisma.readingRecord.create({
        data: createRecordingDto,
      })) as RecordingResponseDto;
    return recording;
  }

  /**
   * Get recordings by user book id
   * @param user_book_id - The user book id
   * @returns The recordings
   */
  async getRecordingsByUserBookId(
    user_book_id: string,
  ): Promise<RecordingsResponseDto> {
    const recordings: RecordingResponseDto[] =
      (await this.prisma.readingRecord.findMany({
        where: { user_book_id },
      })) as RecordingResponseDto[];
    return {
      recordings,
      totalCount: recordings.length,
    };
  }

  /**
   * Delete a recording
   * @param id - The id of the recording
   * @returns The recording
   */
  async deleteRecording(id: string): Promise<RecordingResponseDto> {
    const recording: RecordingResponseDto =
      (await this.prisma.readingRecord.delete({
        where: { id },
      })) as RecordingResponseDto;
    return recording;
  }
}
