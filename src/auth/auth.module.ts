// import dependencies
import { Module } from "@nestjs/common";

// import services
import { AuthService } from "@/auth/auth.service";
import { ConfigService } from "@nestjs/config";

// import controllers
import { AuthController } from "@/auth/auth.controller";

// import modules
import { UserModule } from "@/user/user.module";
import { PrismaModule } from "@/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
