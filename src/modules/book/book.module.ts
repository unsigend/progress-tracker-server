// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { ImagesModule } from "@modules/images/images.module";
import { S3Module } from "@modules/S3/S3.module";

// import services
import { BookService } from "@modules/book/book.service";

// import controllers
import { BookController } from "@modules/book/book.controller";

@Module({
  imports: [DatabaseModule, ImagesModule, S3Module],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
