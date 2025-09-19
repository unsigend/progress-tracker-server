// import dependencies
import { Module } from "@nestjs/common";

// import configuration
import APP_CONFIG from "@modules/config/app.config";

// import modules
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [APP_CONFIG],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
