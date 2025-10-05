// import dependencies
import { Injectable, NotFoundException } from "@nestjs/common";

// import services
import { PrismaService } from "@modules/database/prisma.service";
import { UserBookService } from "@modules/userBook/userBook.service";

// import dto
import { CreateRecordingDto } from "@modules/readingRecording/dto/create-recording.dto";
import { RecordingResponseDto } from "@modules/readingRecording/dto/recording-response.dto";
import { RecordingsResponseDto } from "@modules/readingRecording/dto/recordings-response.dto";
import { UserBookResponseDto } from "@modules/userBook/dto/user-book-response.dto";
import { UserBookUpdateDto } from "@modules/userBook/dto/user-book-update.dto";

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
  async createRecording(
    createRecordingDto: CreateRecordingDto,
  ): Promise<RecordingResponseDto> {
    // check if the user book exists
    const userBook: UserBookResponseDto | null =
      await this.userBookService.findById(createRecordingDto.user_book_id);
    if (!userBook) {
      throw new NotFoundException("Tracked Book Data not found");
    }

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
    } else {
      // create the recording
      recording = (await this.prisma.readingRecord.create({
        data: createRecordingDto,
      })) as RecordingResponseDto;
    }

    // update the user book data
    const userBookUpdateDto: UserBookUpdateDto = {
      total_minutes: userBook.total_minutes + createRecordingDto.minutes,
      total_days: userBook.total_days + 1,
      current_page: userBook.current_page + createRecordingDto.pages,
    };
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
    // get the recording
    const recording: RecordingResponseDto | null =
      (await this.prisma.readingRecord.findUnique({
        where: { id },
      })) as RecordingResponseDto;
    if (!recording) {
      throw new NotFoundException("Recording not found");
    }

    // get the user book
    const userBook: UserBookResponseDto | null =
      await this.userBookService.findById(recording.user_book_id);
    if (!userBook) {
      throw new NotFoundException("Tracked Book Data not found");
    }

    // update the user book data
    const userBookUpdateDto: UserBookUpdateDto = {
      total_minutes: userBook.total_minutes - recording.minutes,
      total_days: userBook.total_days - 1,
      current_page: userBook.current_page - recording.pages,
    };
    await this.userBookService.update(
      recording.user_book_id,
      userBookUpdateDto,
    );

    // delete the recording
    const deletedRecording: RecordingResponseDto =
      (await this.prisma.readingRecord.delete({
        where: { id },
      })) as RecordingResponseDto;

    return deletedRecording;
  }
}
