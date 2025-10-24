// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

// import use cases
import { FindReadingRecordingByIdUseCase } from "@/application/use-cases/reading-recording/find-recording-id.use-case";
import { FindAllReadingRecordingsUseCase } from "@/application/use-cases/reading-recording/find-all-recording.use-case";
import { CreateRecordingUseCase } from "@/application/use-cases/reading-recording/create-recording.use-case";
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
    CreateRecordingUseCase,
    FindReadingRecordingByIdUseCase,
    UpdateReadingRecordingUseCase,
    DeleteReadingRecordingUseCase,
    DeleteReadingRecordingUserBookIdUseCase,
    FindAllReadingRecordingsUseCase,
  ],
  exports: [
    CreateRecordingUseCase,
    FindReadingRecordingByIdUseCase,
    UpdateReadingRecordingUseCase,
    DeleteReadingRecordingUseCase,
    DeleteReadingRecordingUserBookIdUseCase,
    FindAllReadingRecordingsUseCase,
  ],
})
export class ReadingRecordingUseCaseModule {}
