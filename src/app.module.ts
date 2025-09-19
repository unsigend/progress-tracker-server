// import dependencies
import { Module } from "@nestjs/common";

// import configuration
import APP_CONFIG from "@modules/config/app.config";
import DATABASE_CONFIG from "@modules/database/config/database.config";

// import modules
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [APP_CONFIG, DATABASE_CONFIG],
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
