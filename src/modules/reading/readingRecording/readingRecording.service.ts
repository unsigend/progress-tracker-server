// import dependencies
import { Injectable, NotFoundException } from "@nestjs/common";

// import services
import { PrismaService } from "@modules/database/prisma.service";
import { UserBookService } from "@/modules/reading/userBook/userBook.service";

// import dto
import { CreateRecordingDto } from "@/modules/reading/readingRecording/dto/create-recording.dto";
import { RecordingResponseDto } from "@/modules/reading/readingRecording/dto/recording-response.dto";
import { RecordingsResponseDto } from "@/modules/reading/readingRecording/dto/recordings-response.dto";
import { UserBookUpdateDto } from "@/modules/reading/userBook/dto/user-book-update.dto";

@Injectable()
export class ReadingRecordingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userBookService: UserBookService,
  ) {}

  /**
   * Create a recording
   * @param createRecordingDto - The data to create the recording
   * @returns The recording
   */
  async create(
    createRecordingDto: CreateRecordingDto,
  ): Promise<RecordingResponseDto> {
    // check if the recording date already exist in the same book with same date
    let recording: RecordingResponseDto | null =
      (await this.prisma.readingRecord.findUnique({
        where: {
          user_book_id_date: {
            user_book_id: createRecordingDto.user_book_id,
            date: createRecordingDto.date,
          },
        },
      })) as RecordingResponseDto;

    let userBookUpdateDto: UserBookUpdateDto | null = null;

    if (recording) {
      // if the recording date already exist in the same book, merge the data
      recording = (await this.prisma.readingRecord.update({
        where: { id: recording.id },
        data: {
          pages: recording.pages + createRecordingDto.pages,
          minutes: recording.minutes + createRecordingDto.minutes,
          notes: recording.notes ?? createRecordingDto.notes,
        },
      })) as RecordingResponseDto;

      userBookUpdateDto = {
        pages: createRecordingDto.pages,
        minutes: createRecordingDto.minutes,
        date: createRecordingDto.date,
        days: 0,
      };
    } else {
      // create the new recording
      recording = (await this.prisma.readingRecord.create({
        data: createRecordingDto,
      })) as RecordingResponseDto;

      userBookUpdateDto = {
        pages: createRecordingDto.pages,
        minutes: createRecordingDto.minutes,
        date: createRecordingDto.date,
        days: 1,
      };
    }

    // update the user book data
    await this.userBookService.update(
      createRecordingDto.user_book_id,
      userBookUpdateDto,
    );
    return recording;
  }

  /**
   * Get recordings by user book id
   * @param user_book_id - The user book id
   * @returns The recordings
   */
  async getAll(user_book_id: string): Promise<RecordingsResponseDto> {
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
  async delete(id: string): Promise<RecordingResponseDto> {
    // get the recording
    const recording: RecordingResponseDto | null =
      (await this.prisma.readingRecord.findUnique({
        where: { id },
      })) as RecordingResponseDto;
    if (!recording) {
      throw new NotFoundException("Recording not found");
    }

    // delete the recording
    const deletedRecording: RecordingResponseDto =
      (await this.prisma.readingRecord.delete({
        where: { id },
      })) as RecordingResponseDto;

    // update the user book data
    const userBookUpdateDto: UserBookUpdateDto = {
      pages: -recording.pages,
      minutes: -recording.minutes,
      days: -1,
    };
    await this.userBookService.update(
      recording.user_book_id,
      userBookUpdateDto,
    );

    return deletedRecording;
  }

  /**
   * Delete all recordings by user book id
   * @param user_book_id - The user book id
   * @returns The boolean if the recordings were deleted successfully
   */
  async deleteAll(user_book_id: string): Promise<boolean> {
    // delete all recordings
    try {
      await this.prisma.readingRecord.deleteMany({
        where: { user_book_id },
      });
    } catch {
      return false;
    }
    return true;
  }
}
