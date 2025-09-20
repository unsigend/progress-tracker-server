// import dependencies
import { Module } from "@nestjs/common";

// import configuration
import APP_CONFIG from "@modules/config/app.config";
import DATABASE_CONFIG from "@modules/database/config/database.config";
import AUTH_CONFIG from "@modules/auth/config/auth.config";

// import modules
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@modules/user/user.module";
import { BookModule } from "@modules/book/book.module";
import { AuthModule } from "@modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [APP_CONFIG, DATABASE_CONFIG, AUTH_CONFIG],
      isGlobal: true,
    }),
    UserModule,
    BookModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
