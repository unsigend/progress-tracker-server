// import dependencies
import { Module } from "@nestjs/common";
// import modules
import { DatabaseModule } from "@modules/database/database.module";
// import services
import { BookService } from "@modules/book/book.service";
// import controllers
import { BookController } from "@modules/book/book.controller";

@Module({
  imports: [DatabaseModule],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
