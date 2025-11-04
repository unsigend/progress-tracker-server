// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/modules/database/database.module";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "../domain/repositories/book.repository";
import { USER_BOOK_REPOSITORY_TOKEN } from "../domain/repositories/user-book.repository";
import { RECORDING_REPOSITORY_TOKEN } from "../domain/repositories/recording.repository";
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";

// import services
import { BookPermissionPolicyService } from "./services/permission-policy/book-permission-policy.service";

// import repositories
import { BookRepository } from "./repositories/book.repository";
import { UserBookRepository } from "./repositories/user-book.repository";
import { RecordingRepository } from "./repositories/recording.repository";
/**
 * Reading infrastructure module
 * @description Reading infrastructure module which provides
 * the reading infrastructure services
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: BOOK_REPOSITORY_TOKEN,
      useClass: BookRepository,
    },
    {
      provide: USER_BOOK_REPOSITORY_TOKEN,
      useClass: UserBookRepository,
    },
    {
      provide: RECORDING_REPOSITORY_TOKEN,
      useClass: RecordingRepository,
    },
    {
      provide: PERMISSION_POLICY_TOKEN,
      useClass: BookPermissionPolicyService,
    },
  ],
  exports: [
    BOOK_REPOSITORY_TOKEN,
    USER_BOOK_REPOSITORY_TOKEN,
    RECORDING_REPOSITORY_TOKEN,
    PERMISSION_POLICY_TOKEN,
  ],
})
export class ReadingInfrastructureModule {}
