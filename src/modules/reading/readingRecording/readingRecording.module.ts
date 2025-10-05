// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { UserBookModule } from "@modules/reading/userBook/userBook.module";

// import services
import { ReadingRecordingService } from "@/modules/reading/readingRecording/readingRecording.service";

// import controllers
import { ReadingRecordingController } from "@/modules/reading/readingRecording/readingRecording.controller";

@Module({
  imports: [DatabaseModule, UserBookModule],
  providers: [ReadingRecordingService],
  controllers: [ReadingRecordingController],
  exports: [ReadingRecordingService],
})
export class ReadingRecordingModule {}
