// import dependencies
import { Module } from "@nestjs/common";

// import controllers
import { UserController } from "./controllers/user.controller";

/**
 * User presentation module
 * @description User presentation module which provides the user presentation services
 */
@Module({
  controllers: [UserController],
})
export class UserPresentationModule {}
