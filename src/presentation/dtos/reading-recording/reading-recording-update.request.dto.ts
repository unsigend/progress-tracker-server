// import dependencies
import { PartialType } from "@nestjs/swagger";

// import dtos
import { ReadingRecordingCreateRequestDto } from "@/presentation/dtos/reading-recording/reading-recording-create.request.dto";

/**
 * Reading recording update request dto
 * @description Reading recording update request dto
 */
export class ReadingRecordingUpdateRequestDto extends PartialType(
  ReadingRecordingCreateRequestDto,
) {}
