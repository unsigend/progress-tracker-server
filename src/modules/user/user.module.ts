// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserApplicationModule } from "./application/application.module";
import { UserPresentationModule } from "./presentation/presentation.module";
import { UserInfrastructureModule } from "./infrastructure/infrastructure.module";

/**
 * User module
 * @description User module which provides the user services
 */
@Module({
  imports: [
    UserApplicationModule,
    UserPresentationModule,
    UserInfrastructureModule,
  ],
  exports: [
    UserApplicationModule,
    UserPresentationModule,
    UserInfrastructureModule,
  ],
})
export class UserModule {}
