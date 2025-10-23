// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";

/**
 * Find reading recording by id use case
 * @description Find reading recording by id use case
 */
@Injectable()
export class FindReadingRecordingByIdUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
  ) {}

  /**
   * Execute the find reading recording by id use case
   * @description Execute the find reading recording by id use case
   * @param id - The id of the recording to be found
   * @returns The recording entity
   */
  async execute(id: ObjectIdValueObject): Promise<ReadingRecordingEntity> {
    const readingRecording: ReadingRecordingEntity | null =
      await this.readingRecordingRepository.findById(id);
    if (!readingRecording) {
      throw new NotFoundException("Reading recording not found");
    }
    return readingRecording;
  }
}
