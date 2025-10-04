// import dependencies
import {
  Controller,
  Post,
  Body,
  Get,
  ParseUUIDPipe,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

// import services
import { ReadingRecordingService } from "@modules/readingRecording/readingRecording.service";

// import dto
import { CreateRecordingDto } from "@modules/readingRecording/dto/create-recording.dto";
import { RecordingResponseDto } from "@modules/readingRecording/dto/recording-response.dto";
import { RecordingsResponseDto } from "@modules/readingRecording/dto/recordings-response.dto";

@Controller("reading-recordings")
export class ReadingRecordingController {
  constructor(
    private readonly readingRecordingService: ReadingRecordingService,
  ) {}

  /**
   * Create a recording
   * @param createRecordingDto - The data to create the recording
   * @returns The recording
   */
  @ApiOperation({ summary: "Create a recording" })
  @ApiBody({ type: CreateRecordingDto })
  @ApiCreatedResponse({
    type: RecordingResponseDto,
    description: "The recording created successfully",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Recording not created" })
  @Post()
  async create(
    @Body() createRecordingDto: CreateRecordingDto,
  ): Promise<RecordingResponseDto> {
    return this.readingRecordingService.createRecording(createRecordingDto);
  }

  /**
   * Get recordings by user book id
   * @param user_book_id - The user book id
   * @returns The recordings
   */
  @ApiOperation({ summary: "Get recordings by user book id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({ type: RecordingsResponseDto })
  @ApiNotFoundResponse({ description: "Recordings not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get(":id")
  async findById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<RecordingsResponseDto> {
    return this.readingRecordingService.getRecordingsByUserBookId(id);
  }

  /**
   * Delete a recording
   * @param id - The id of the recording
   * @returns The recording
   */
  @ApiOperation({ summary: "Delete a recording" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({ type: RecordingResponseDto })
  @ApiNotFoundResponse({ description: "Recording not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Delete(":id")
  async deleteById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<RecordingResponseDto> {
    return this.readingRecordingService.deleteRecording(id);
  }
}
