// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { UserModule } from "@modules/user/user.module";
import { BookModule } from "@modules/book/book.module";
import { ReadingRecordingModule } from "@modules/reading/readingRecording/readingRecording.module";

// import services
import { UserBookService } from "@/modules/reading/userBook/userBook.service";

// import controllers
import { UserBookController } from "@/modules/reading/userBook/userBook.controller";

@Module({
  imports: [DatabaseModule, UserModule, BookModule, ReadingRecordingModule],
  providers: [UserBookService],
  controllers: [UserBookController],
  exports: [UserBookService],
})
export class UserBookModule {}
