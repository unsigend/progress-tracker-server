// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ReadingModule } from "@/modules/reading/reading.module";

// import use cases
import { ReadingRecordingUseCase } from "./use-case/reading-recording.use-case";
import { ReadingRecordingDetailUseCase } from "./use-case/reading-recording-detail.use-case";

/**
 * Statistics application module
 * @description Statistics application module which is used to handle the statistics requests.
 */
@Module({
  imports: [ReadingModule],
  providers: [ReadingRecordingUseCase, ReadingRecordingDetailUseCase],
  exports: [ReadingRecordingUseCase, ReadingRecordingDetailUseCase],
})
export class StatisticsApplicationModule {}
