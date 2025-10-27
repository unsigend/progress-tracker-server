// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/modules/database/database.module";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "../domain/repositories/book.repository";

// import repositories
import { BookRepository } from "./repositories/book.repository";

/**
 * Reading infrastructure module
 * @description Reading infrastructure module which provides the reading infrastructure services
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: BOOK_REPOSITORY_TOKEN,
      useClass: BookRepository,
    },
  ],
  exports: [BOOK_REPOSITORY_TOKEN],
})
export class ReadingInfrastructureModule {}
