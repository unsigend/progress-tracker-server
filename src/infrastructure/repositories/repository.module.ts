// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/infrastructure/database/database.module";

// import repositories
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { BookRepository } from "@/infrastructure/repositories/book.repository";
import { UserBookRepository } from "@/infrastructure/repositories/user-book.repository";
import { ReadingRecordingRepository } from "@/infrastructure/repositories/reading-recording.repository";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";
import { USER_BOOK_REPOSITORY_TOKEN } from "@domain/repositories/user-book.repository";
import { READING_RECORDING_REPOSITORY_TOKEN } from "@domain/repositories/reading-recording.repository";

/**
 * Repository module
 * @description Repository module
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: BOOK_REPOSITORY_TOKEN,
      useClass: BookRepository,
    },
    {
      provide: USER_BOOK_REPOSITORY_TOKEN,
      useClass: UserBookRepository,
    },
    {
      provide: READING_RECORDING_REPOSITORY_TOKEN,
      useClass: ReadingRecordingRepository,
    },
  ],
  exports: [
    USER_REPOSITORY_TOKEN,
    BOOK_REPOSITORY_TOKEN,
    USER_BOOK_REPOSITORY_TOKEN,
    READING_RECORDING_REPOSITORY_TOKEN,
  ],
})
export class RepositoryModule {}
