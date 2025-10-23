// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";

/**
 * Find reading recording by user book id use case
 * @description Find reading recording by user book id use case
 */
@Injectable()
export class FindReadingRecordingByUserBookIdUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
  ) {}

  /**
   * Execute the find reading recording by user book id use case
   * @description Execute the find reading recording by user book id use case
   * @param userBookId - The id of the user book to be found
    @returns The reading recordings and total count
   */
  async execute(userBookId: ObjectIdValueObject): Promise<{
    readingRecordings: ReadingRecordingEntity[];
    totalCount: number;
  }> {
    const { readingRecordings, totalCount } =
      await this.readingRecordingRepository.findByUserBookId(userBookId);
    return { readingRecordings, totalCount };
  }
}
