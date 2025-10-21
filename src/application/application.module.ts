// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserUseCaseModule } from "@/application/use-cases/user/user.use-case.module";

/**
 * Application module
 * @description Application module
 */
@Module({
  imports: [UserUseCaseModule],
  exports: [UserUseCaseModule],
})
export class ApplicationModule {}
