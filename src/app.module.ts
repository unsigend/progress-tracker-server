// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@/modules/user/user.module";
import { DatabaseModule } from "@/modules/database/database.module";
import { InfrastructureModule } from "@shared/infrastructure/infrastructure.module";

// import configurations
import appConfig from "@shared/platforms/config/app.config";
import jwtTokenConfig from "@modules/auth/infrastructure/services/jwt-token/config/jwt-token.config";
import resendMailerConfig from "@shared/infrastructure/services/resend-mailer/config/resend-mailer.config";
import awsS3CloudConfig from "@shared/infrastructure/services/aws-s3-cloud/config/aws-s3-cloud.config";
import postgresqlConfig from "@modules/database/postgresql/config/postgresql.config";

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
        jwtTokenConfig,
        resendMailerConfig,
        awsS3CloudConfig,
      ],
    }),
    DatabaseModule,
    InfrastructureModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
