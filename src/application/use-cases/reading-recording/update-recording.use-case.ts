// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import tokens
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

// import entities
import { ReadingRecordingEntity } from "@domain/entities/reading-recording.entity";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

/**
 * Update reading recording use case
 * @description Update reading recording use case
 */
@Injectable()
export class UpdateReadingRecordingUseCase {
  constructor(
    @Inject(READING_RECORDING_REPOSITORY_TOKEN)
    private readonly readingRecordingRepository: IReadingRecordingRepository,
  ) {}

  /**
   * Execute the update recording use case
   * @description Execute the update recording use case
   * @param id - The id of the recording to be updated
   * @param userBookId - The id of the user book to be updated
   * @param date - The date of the recording to be updated
   * @param pages - The pages of the recording to be updated
   * @param minutes - The minutes of the recording to be updated
   * @param notes - The notes of the recording to be updated
   * @returns The recording entity
   */
  async execute(
    id: ObjectIdValueObject,
    date?: Date | null,
    pages?: PageValueObject | null,
    minutes?: MinuteValueObject | null,
    notes?: string | null,
  ): Promise<ReadingRecordingEntity> {
    const readingRecording: ReadingRecordingEntity | null =
      await this.readingRecordingRepository.findById(id);
    if (!readingRecording) {
      throw new NotFoundException("Reading recording not found");
    }

    // if the date is provided, update the date
    if (date) {
      readingRecording.setDate(date);
    }

    // if the pages is provided, update the pages
    if (pages) {
      readingRecording.setPages(pages);
    }

    // if the minutes is provided, update the minutes
    if (minutes) {
      readingRecording.setMinutes(minutes);
    }

    // if the notes is provided, update the notes
    if (notes) {
      readingRecording.setNotes(notes);
    }

    // save the reading recording
    await this.readingRecordingRepository.save(readingRecording);

    // return the reading recording
    return readingRecording;
  }
}
