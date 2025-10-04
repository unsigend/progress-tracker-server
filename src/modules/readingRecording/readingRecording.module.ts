// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";

// import services
import { ReadingRecordingService } from "@modules/readingRecording/readingRecording.service";

// import controllers
import { ReadingRecordingController } from "@modules/readingRecording/readingRecording.controller";

@Module({
  imports: [DatabaseModule],
  providers: [ReadingRecordingService],
  controllers: [ReadingRecordingController],
})
export class ReadingRecordingModule {}
