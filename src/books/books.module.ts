// import dependencies
import { Module } from "@nestjs/common";

// import services
import { BooksService } from "@/books/books.service";

// import modules
import { PrismaModule } from "@/prisma/prisma.module";

// import controllers
import { BooksController } from "@/books/books.controller";

@Module({
  imports: [PrismaModule],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
