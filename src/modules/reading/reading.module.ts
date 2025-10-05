// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { UserBookModule } from "@/modules/reading/userBook/userBook.module";
import { ReadingRecordingModule } from "@/modules/reading/readingRecording/readingRecording.module";

// import services
import { ReadingRecordingService } from "@/modules/reading/readingRecording/readingRecording.service";

@Module({
  imports: [DatabaseModule, UserBookModule, ReadingRecordingModule],
  providers: [ReadingRecordingService],
  controllers: [],
  exports: [ReadingRecordingModule, UserBookModule],
})
export class ReadingModule {}
