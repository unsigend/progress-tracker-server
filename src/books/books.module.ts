// import dependencies
import { Module } from "@nestjs/common";

// import controllers
import { BooksController } from "@/books/books.controller";

// import services
import { BooksService } from "@/books/books.service";

// import PrismaModule
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
