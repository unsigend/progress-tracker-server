// import dependencies
import { Module } from "@nestjs/common";
// import modules
import { UserModule } from "@modules/user/user.module";
import { PassportModule } from "@nestjs/passport";
// import services
import { AuthService } from "@modules/auth/auth.service";
// import controllers
import { AuthController } from "@modules/auth/auth.controller";
// import strategies
import { LocalStrategy } from "@modules/auth/strategy/local.strategy";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
