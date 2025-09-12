// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { BooksModule } from "@/books/books.module";

@Module({
  imports: [BooksModule],
})
export class AppModule {}
