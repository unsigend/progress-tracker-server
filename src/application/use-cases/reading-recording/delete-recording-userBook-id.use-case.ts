// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";

/**
 * Delete reading recording user book id use case
 * @description Delete reading recording user book id use case
 */
@Injectable()
export class DeleteReadingRecordingUserBookIdUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
  ) {}

  /**
   * Execute the delete reading recording user book id use case
   * @description Execute the delete reading recording user book id use case
   * @param userBookId - The id of the user book to be deleted
   * @returns The number of deleted reading recordings
   */
  async execute(userBookId: ObjectIdValueObject): Promise<number> {
    const deletedCount =
      await this.readingRecordingRepository.deleteByUserBookId(userBookId);
    return deletedCount;
  }
}
