// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";

// import services
import { UserService } from "@modules/user/user.service";

// import controllers
import { UserController } from "@modules/user/user.controller";

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
