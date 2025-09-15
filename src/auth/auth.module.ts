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
import { AuthGithubService } from "@/auth/auth.github.service";
import { AuthGoogleService } from "@/auth/auth.google.service";

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");
        if (!secret) {
          throw new Error("JWT_SECRET is required in environment variables");
        }
        return {
          secret,
          signOptions: { expiresIn: "7d" },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthGithubService, AuthGoogleService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, AuthGithubService, AuthGoogleService],
})
export class AuthModule {}
