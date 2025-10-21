// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ConfigModule } from "@nestjs/config";
import { ApplicationModule } from "@/application/application.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { PresentationModule } from "@/presentation/presentation.module";

// import configurations
import postgresqlConfig from "@/infrastructure/database/postgresql/config/postgresql.config";
import appConfig from "@/platforms/config/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [postgresqlConfig, appConfig],
    }),
    ApplicationModule,
    InfrastructureModule,
    PresentationModule,
  ],
})
export class AppModule {}
