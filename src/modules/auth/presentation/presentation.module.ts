// import dependencies
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthApplicationModule } from "../application/application.module";
import { AuthInfrastructureModule } from "../infrastructure/infrastructure.module";
import { GithubStrategy } from "@/shared/platforms/strategies/github.strategy";
import { GoogleStrategy } from "@/shared/platforms/strategies/google.strategy";

/**
 * Auth presentation module
 * @description Auth presentation module which provides the auth presentation services
 */
@Module({
  controllers: [AuthController],
  imports: [AuthApplicationModule, AuthInfrastructureModule],
  providers: [GithubStrategy, GoogleStrategy],
})
export class AuthPresentationModule {}
