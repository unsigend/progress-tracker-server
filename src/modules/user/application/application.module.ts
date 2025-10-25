// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserInfrastructureModule } from "../infrastructure/infrastructure.module";

/**
 * User application module
 * @description User application module which provides the user application services
 */
@Module({
  imports: [UserInfrastructureModule],
  providers: [],
  exports: [],
})
export class UserApplicationModule {}
