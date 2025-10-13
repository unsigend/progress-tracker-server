// import dependencies
import { Module } from "@nestjs/common";
// import modules
import { UserModule } from "@modules/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@modules/mailer/mailer.module";
// import services
import { AuthService } from "@modules/auth/auth.service";
// import controllers
import { AuthController } from "@modules/auth/auth.controller";
// import strategies
import { LocalStrategy } from "@modules/auth/strategy/local.strategy";
import { JwtStrategy } from "@modules/auth/strategy/jwt.strategy";
import { GoogleStrategy } from "@modules/auth/strategy/google.strategy";
import { GithubStrategy } from "@modules/auth/strategy/github.strategy";

@Module({
  imports: [
    UserModule,
    MailerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("auth.JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("auth.JWT_EXPIRATION_TIME"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
