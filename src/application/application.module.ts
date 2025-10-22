// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserUseCaseModule } from "@/application/use-cases/user/user.use-case.module";
import { AuthUseCaseModule } from "@/application/use-cases/auth/auth.use-case.module";
import { CloudUseCaseModule } from "@/application/use-cases/cloud/cloud.use-case.module";

/**
 * Application module
 * @description Application module
 */
@Module({
  imports: [UserUseCaseModule, AuthUseCaseModule, CloudUseCaseModule],
  exports: [UserUseCaseModule, AuthUseCaseModule, CloudUseCaseModule],
})
export class ApplicationModule {}
