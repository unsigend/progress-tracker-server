// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PresentationModule } from "@presentation/presentation.module";

// import configurations
import appConfig from "@/platforms/config/app.config";
import postgresqlConfig from "@infrastructure/database/postgresql/config/postgresql.config";
import jwtTokenConfig from "@/infrastructure/services/jwt-token/config/jwt-token.config";
import awsS3CloudConfig from "@/infrastructure/services/aws-s3-cloud/config/aws-s3-cloud.config";
import resendMailerConfig from "@/infrastructure/services/resend-mailer/config/resend-mailer.config";

// import guards
import { JwtAuthGuard } from "@/platforms/guards/jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";

// import strategies
import { JwtStrategy } from "@/platforms/strategy/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [
        postgresqlConfig,
        appConfig,
        jwtTokenConfig,
        awsS3CloudConfig,
        resendMailerConfig,
      ],
    }),
    PassportModule,
    ApplicationModule,
    InfrastructureModule,
    PresentationModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
