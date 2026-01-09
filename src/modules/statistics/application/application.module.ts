// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ReadingModule } from "@/modules/reading/reading.module";
import { CoursesInfrastructureModule } from "@/modules/courses/infrastructure/infrastructure.module";

// import use cases
import { ReadingRecordingUseCase } from "./use-case/reading/reading-recording.use-case";
import { ReadingRecordingDetailUseCase } from "./use-case/reading/reading-recording-detail.use-case";
import { CourseRecordingDetailUseCase } from "./use-case/courses/course-recording-detail.use-case";

/**
 * Statistics application module
 * @description Statistics application module which is used to handle the statistics requests.
 */
@Module({
  imports: [ReadingModule, CoursesInfrastructureModule],
  providers: [
    ReadingRecordingUseCase,
    ReadingRecordingDetailUseCase,
    CourseRecordingDetailUseCase,
  ],
  exports: [
    ReadingRecordingUseCase,
    ReadingRecordingDetailUseCase,
    CourseRecordingDetailUseCase,
  ],
})
export class StatisticsApplicationModule {}
