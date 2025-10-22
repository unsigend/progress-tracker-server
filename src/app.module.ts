// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ConfigModule } from "@nestjs/config";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PresentationModule } from "@presentation/presentation.module";

// import configurations
import appConfig from "@/platforms/config/app.config";
import postgresqlConfig from "@infrastructure/database/postgresql/config/postgresql.config";
import jwtTokenConfig from "@/infrastructure/services/jwt-token/config/jwt-token.config";
import awsS3CloudConfig from "@/infrastructure/services/aws-s3-cloud/config/aws-s3-cloud.config";
import resendMailerConfig from "@/infrastructure/services/resend-mailer/config/resend-mailer.config";

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
    ApplicationModule,
    InfrastructureModule,
    PresentationModule,
  ],
})
export class AppModule {}
