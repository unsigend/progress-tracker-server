// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ApplicationModule } from "@/application/application.module";

// import controllers
import { UserController } from "@/presentation/controllers/user.controller";
import { AuthController } from "@/presentation/controllers/auth.controller";

/**
 * Presentation module
 * @description Presentation module
 */
@Module({
  imports: [ApplicationModule],
  controllers: [UserController, AuthController],
})
export class PresentationModule {}
