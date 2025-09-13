// import dependencies
import { Module } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import controllers
import { BooksController } from "@/books/books.controller";

@Module({
  imports: [],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
