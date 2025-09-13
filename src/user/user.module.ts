// import dependencies
import { Module } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";

// import controllers
import { UserController } from "@/user/user.controller";

// import modules
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
