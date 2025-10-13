// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { S3Module } from "@modules/S3/S3.module";

// import services
import { UserService } from "@modules/user/user.service";

// import controllers
import { UserController } from "@modules/user/user.controller";

@Module({
  imports: [DatabaseModule, S3Module],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
