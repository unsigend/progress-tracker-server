// import dependencies
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";

// import entities
import { ReadingRecordingEntity } from "@/domain/entities/reading-recording.entity";

/**
 * Delete reading recording use case
 * @description Delete reading recording use case
 */
@Injectable()
export class DeleteReadingRecordingUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
  ) {}

  /**
   * Execute the delete reading recording use case
   * @description Execute the delete reading recording use case
   * @param id - The id of the reading recording to be deleted
   * @returns void
   */
  async execute(id: ObjectIdValueObject): Promise<void> {
    // find the reading recording by id
    const readingRecording: ReadingRecordingEntity | null =
      await this.readingRecordingRepository.findById(id);

    if (!readingRecording) {
      throw new NotFoundException("Reading recording not found");
    }

    // delete the reading recording
    readingRecording.delete();

    // delete the reading recording in repository
    await this.readingRecordingRepository.delete(id);
  }
}
