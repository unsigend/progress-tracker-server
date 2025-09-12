// import dependencies
import { Module } from '@nestjs/common';

// import controllers
import { BooksController } from '@/books/books.controller';

// import services

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [],
})
export class AppModule {}
