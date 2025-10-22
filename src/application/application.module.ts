// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserUseCaseModule } from "@/application/use-cases/user/user.use-case.module";
import { AuthUseCaseModule } from "@/application/use-cases/auth/auth.use-case.module";
import { CloudUseCaseModule } from "@/application/use-cases/cloud/cloud.use-case.module";
import { BookUseCaseModule } from "@/application/use-cases/book/book.use-case.module";

/**
 * Application module
 * @description Application module
 */
@Module({
  imports: [
    UserUseCaseModule,
    AuthUseCaseModule,
    CloudUseCaseModule,
    BookUseCaseModule,
  ],
  exports: [
    UserUseCaseModule,
    AuthUseCaseModule,
    CloudUseCaseModule,
    BookUseCaseModule,
  ],
})
export class ApplicationModule {}
