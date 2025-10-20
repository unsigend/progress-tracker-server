// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ConfigModule } from "@nestjs/config";

// import configurations
import postgresqlConfig from "@/infrastructure/database/postgresql/config/postgresql.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [postgresqlConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
