// import dependencies
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthApplicationModule } from "../application/application.module";

/**
 * Auth presentation module
 * @description Auth presentation module which provides the auth presentation services
 */
@Module({
  controllers: [AuthController],
  imports: [AuthApplicationModule],
})
export class AuthPresentationModule {}
