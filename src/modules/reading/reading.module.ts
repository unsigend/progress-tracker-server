// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { UserModule } from "@modules/user/user.module";
import { BookModule } from "@modules/book/book.module";

// import services
import { ReadingService } from "@/modules/reading/reading.service";

// import controllers
import { UserBookController } from "@/modules/reading/userBook.controller";

@Module({
  imports: [DatabaseModule, UserModule, BookModule],
  providers: [ReadingService],
  controllers: [UserBookController],
})
export class ReadingModule {}
