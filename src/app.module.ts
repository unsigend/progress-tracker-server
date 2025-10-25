// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@/modules/database/database.module";

// import configurations
import appConfig from "@/platforms/config/app.config";
import postgresqlConfig from "@/modules/database/postgresql/config/postgresql.config";

/**
 * Application module
 * @description Application module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, postgresqlConfig],
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
