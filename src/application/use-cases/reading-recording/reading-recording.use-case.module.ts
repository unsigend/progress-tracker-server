// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

// import use cases
import { CreateReadingRecordingUseCase } from "@/application/use-cases/reading-recording/create-recording.use-case";
import { FindReadingRecordingByIdUseCase } from "@/application/use-cases/reading-recording/find-recording-id.use-case";
import { FindReadingRecordingByUserBookIdUseCase } from "@/application/use-cases/reading-recording/find-recording-userBook-id.use-case";
import { UpdateReadingRecordingUseCase } from "@/application/use-cases/reading-recording/update-recording.use-case";
import { DeleteReadingRecordingUseCase } from "@application/use-cases/reading-recording/delete-recording.use-case";
import { DeleteReadingRecordingUserBookIdUseCase } from "@/application/use-cases/reading-recording/delete-recording-userBook-id.use-case";

/**
 * Reading recording use case module
 * @description Reading recording use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateReadingRecordingUseCase,
    FindReadingRecordingByIdUseCase,
    FindReadingRecordingByUserBookIdUseCase,
    UpdateReadingRecordingUseCase,
    DeleteReadingRecordingUseCase,
    DeleteReadingRecordingUserBookIdUseCase,
  ],
  exports: [
    CreateReadingRecordingUseCase,
    FindReadingRecordingByIdUseCase,
    FindReadingRecordingByUserBookIdUseCase,
    UpdateReadingRecordingUseCase,
    DeleteReadingRecordingUseCase,
    DeleteReadingRecordingUserBookIdUseCase,
  ],
})
export class ReadingRecordingUseCaseModule {}
