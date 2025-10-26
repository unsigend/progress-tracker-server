// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserApplicationModule } from "../application/application.module";

// import controllers
import { UserController } from "./controllers/user.controller";

/**
 * User presentation module
 * @description User presentation module which provides the user presentation services
 */
@Module({
  controllers: [UserController],
  imports: [UserApplicationModule],
})
export class UserPresentationModule {}
