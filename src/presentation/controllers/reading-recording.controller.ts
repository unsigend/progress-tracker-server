// import dependencies
import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
} from "@nestjs/common";

// import dtos
import { ReadingRecordingResponseDto } from "@/presentation/dtos/reading-recording/reading-recording.response.dto";
import { ReadingRecordingCreateRequestDto } from "@/presentation/dtos/reading-recording/reading-recording-create.request.dto";
import { ReadingRecordingUpdateRequestDto } from "@/presentation/dtos/reading-recording/reading-recording-update.request.dto";

// import use cases
import { CreateReadingRecordingUseCase } from "@/application/use-cases/reading-recording/create-recording.use-case";
import { FindReadingRecordingByIdUseCase } from "@/application/use-cases/reading-recording/find-recording-id.use-case";
import { FindReadingRecordingByUserBookIdUseCase } from "@/application/use-cases/reading-recording/find-recording-userBook-id.use-case";
import { UpdateReadingRecordingUseCase } from "@/application/use-cases/reading-recording/update-recording.use-case";
import { DeleteReadingRecordingUseCase } from "@/application/use-cases/reading-recording/delete-recording.use-case";
import { DeleteReadingRecordingUserBookIdUseCase } from "@/application/use-cases/reading-recording/delete-recording-userBook-id.use-case";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { MinuteValueObject } from "@domain/value-objects/reading-recording/minute.vo";

// import mappers
import { ReadingRecordingMapper } from "@/presentation/mappers/reading-recording.mapper";
import { ReadingRecordingEntity } from "@/domain/entities/reading-recording.entity";
/**
 * Reading recording controller
 * @description Reading recording controller
 */
@Controller("reading-recordings")
export class ReadingRecordingController {
  constructor(
    private readonly createReadingRecordingUseCase: CreateReadingRecordingUseCase,
    private readonly findReadingRecordingByIdUseCase: FindReadingRecordingByIdUseCase,
    private readonly findReadingRecordingUserBookIdUseCase: FindReadingRecordingByUserBookIdUseCase,
    private readonly updateReadingRecordingUseCase: UpdateReadingRecordingUseCase,
    private readonly deleteReadingRecordingUseCase: DeleteReadingRecordingUseCase,
    private readonly deleteReadingRecordingUserBookIdUseCase: DeleteReadingRecordingUserBookIdUseCase,
  ) {}

  /**
   * Create a new reading recording
   */
  @Post()
  async create(
    @Body() readingRecordingCreateRequestDto: ReadingRecordingCreateRequestDto,
  ): Promise<ReadingRecordingResponseDto> {
    const readingRecord: ReadingRecordingEntity =
      await this.createReadingRecordingUseCase.execute(
        new ObjectIdValueObject(readingRecordingCreateRequestDto.userBookId),
        new Date(readingRecordingCreateRequestDto.date),
        new PageValueObject(readingRecordingCreateRequestDto.pages),
        new MinuteValueObject(readingRecordingCreateRequestDto.minutes),
        readingRecordingCreateRequestDto.notes,
      );

    return ReadingRecordingMapper.toResponseDto(readingRecord);
  }

  /**
   * Find a reading recording by id
   */
  @Get(":id")
  async findById(
    @Param("id") id: string,
  ): Promise<ReadingRecordingResponseDto> {
    const readingRecord: ReadingRecordingEntity =
      await this.findReadingRecordingByIdUseCase.execute(
        new ObjectIdValueObject(id),
      );
    return ReadingRecordingMapper.toResponseDto(readingRecord);
  }

  /**
   * Update a reading recording
   */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() readingRecordingUpdateRequestDto: ReadingRecordingUpdateRequestDto,
  ): Promise<ReadingRecordingResponseDto> {
    const readingRecord: ReadingRecordingEntity =
      await this.updateReadingRecordingUseCase.execute(
        new ObjectIdValueObject(id),
        readingRecordingUpdateRequestDto.date
          ? new Date(readingRecordingUpdateRequestDto.date)
          : null,
        readingRecordingUpdateRequestDto.pages
          ? new PageValueObject(readingRecordingUpdateRequestDto.pages)
          : null,
        readingRecordingUpdateRequestDto.minutes
          ? new MinuteValueObject(readingRecordingUpdateRequestDto.minutes)
          : null,
        readingRecordingUpdateRequestDto.notes,
      );

    return ReadingRecordingMapper.toResponseDto(readingRecord);
  }

  /**
   * Delete a reading recording
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    await this.deleteReadingRecordingUseCase.execute(
      new ObjectIdValueObject(id),
    );
  }

  /**
   * Delete a reading recording by user book id
   */
  @Delete("user-book/:id")
  async deleteByUserBookId(@Param("id") id: string): Promise<void> {
    await this.deleteReadingRecordingUserBookIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
  }

  /**
   * Find a reading recording by user book id
   */
  @Get("user-book/:id")
  async findByUserBookId(@Param("id") id: string): Promise<{
    readingRecordings: ReadingRecordingResponseDto[];
    totalCount: number;
  }> {
    const { readingRecordings, totalCount } =
      await this.findReadingRecordingUserBookIdUseCase.execute(
        new ObjectIdValueObject(id),
      );
    return {
      readingRecordings: readingRecordings.map((readingRecording) =>
        ReadingRecordingMapper.toResponseDto(readingRecording),
      ),
      totalCount,
    };
  }
}
