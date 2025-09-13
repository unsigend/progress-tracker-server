// import dependencies
import { Module } from "@nestjs/common";

// import services
import { AuthService } from "@/auth/auth.service";

// import controllers
import { AuthController } from "@/auth/auth.controller";

// import modules
import { UserModule } from "@/user/user.module";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [UserModule, PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
