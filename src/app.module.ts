// import dependencies
import { Module } from "@nestjs/common";

// import configuration
import APP_CONFIG from "@modules/config/app.config";
import DATABASE_CONFIG from "@modules/database/config/database.config";
import AUTH_CONFIG from "@modules/auth/config/auth.config";
import S3_CONFIG from "@modules/S3/config/S3.config";
import MAILER_CONFIG from "@modules/mailer/config/mailer.config";

// import modules
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@modules/user/user.module";
import { BookModule } from "@modules/book/book.module";
import { AuthModule } from "@modules/auth/auth.module";
import { S3Module } from "@modules/S3/S3.module";
import { CloudModule } from "@/modules/cloud/cloud.module";
import { UserBookModule } from "@modules/userBook/userBook.module";
import { StatisticsModule } from "@modules/statistics/statistics.module";
import { MailerModule } from "@modules/mailer/mailer.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        APP_CONFIG,
        DATABASE_CONFIG,
        AUTH_CONFIG,
        S3_CONFIG,
        MAILER_CONFIG,
      ],
      isGlobal: true,
    }),
    UserModule,
    BookModule,
    AuthModule,
    S3Module,
    CloudModule,
    UserBookModule,
    StatisticsModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
