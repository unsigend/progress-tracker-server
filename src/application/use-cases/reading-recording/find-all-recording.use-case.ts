// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

// import queries
import { ReadingRecordingQuery } from "@domain/repositories/queries/reading-recording.query";

// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";

/**
 * Find all reading recordings use case
 * @description Find all reading recordings use case
 */
@Injectable()
export class FindAllReadingRecordingsUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
  ) {}

  /**
   * Execute the find all reading recordings use case
   * @description Execute the find all reading recordings use case
   * @param query - The query to be used to find the reading recordings
   * @returns The reading recordings and total count
   */
  async execute(query: ReadingRecordingQuery): Promise<{
    readingRecordings: ReadingRecordingEntity[];
    totalCount: number;
  }> {
    const { readingRecordings, totalCount } =
      await this.readingRecordingRepository.findAll(query);
    return { readingRecordings, totalCount };
  }
}
