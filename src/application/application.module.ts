// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserUseCaseModule } from "@/application/use-cases/user/user.use-case.module";
import { AuthUseCaseModule } from "@/application/use-cases/auth/auth.use-case.module";

/**
 * Application module
 * @description Application module
 */
@Module({
  imports: [UserUseCaseModule, AuthUseCaseModule],
  exports: [UserUseCaseModule, AuthUseCaseModule],
})
export class ApplicationModule {}
