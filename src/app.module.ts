// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@modules/user/user.module";
import { CloudModule } from "@modules/cloud/cloud.module";
import { DatabaseModule } from "@modules/database/database.module";
import { InfrastructureModule } from "@shared/infrastructure/infrastructure.module";
import { ReadingModule } from "@modules/reading/reading.module";
import { StatisticsModule } from "@modules/statistics/statistics.module";
import { AuthModule } from "@modules/auth/auth.module";

// import guards
import { JwtAuthGuard } from "@shared/platforms/guards/jwt-auth.guard";
import { JwtStrategy } from "@shared/platforms/strategies/jwt.strategy";

// import configurations
import appConfig from "@shared/platforms/config/app.config";
import jwtTokenConfig from "@modules/auth/infrastructure/services/jwt-token/config/jwt-token.config";
import resendMailerConfig from "@shared/infrastructure/services/resend-mailer/config/resend-mailer.config";
import awsS3CloudConfig from "@modules/cloud/infrastructure/aws-s3-cloud/config/aws-s3-cloud.config";
import postgresqlConfig from "@modules/database/postgresql/config/postgresql.config";
import authConfig from "@modules/auth/config/auth.config";

/**
 * Application module
 * @description Application module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        postgresqlConfig,
        authConfig,
        jwtTokenConfig,
        resendMailerConfig,
        awsS3CloudConfig,
      ],
    }),
    PassportModule,
    DatabaseModule,
    AuthModule,
    InfrastructureModule,
    UserModule,
    ReadingModule,
    CloudModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
