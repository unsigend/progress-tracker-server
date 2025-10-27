// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { AuthInfrastructureModule } from "./infrastructure/infrastructure.module";
import { AuthPresentationModule } from "./presentation/presentation.module";

/**
 * Auth module
 * @description Auth module which provides the auth services
 */
@Module({
  imports: [AuthInfrastructureModule, AuthPresentationModule],
  exports: [AuthInfrastructureModule, AuthPresentationModule],
})
export class AuthModule {}
