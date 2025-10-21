// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ApplicationModule } from "@/application/application.module";

// import controllers
import { UserController } from "@/presentation/controllers/user.controller";
/**
 * Presentation module
 * @description Presentation module
 */
@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
})
export class PresentationModule {}
