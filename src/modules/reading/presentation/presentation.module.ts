// import dependencies
import { Module } from "@nestjs/common";

// import controllers
import { BookController } from "./controllers/book.controller";
import { UserBookController } from "./controllers/user-book.controller";

// import application module
import { ReadingApplicationModule } from "../application/application.module";

/**
 * Reading presentation module
 * @description Reading presentation module which provides the reading presentation services
 */
@Module({
  controllers: [BookController, UserBookController],
  imports: [ReadingApplicationModule],
  exports: [],
})
export class ReadingPresentationModule {}
