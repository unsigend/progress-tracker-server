// import dependencies
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";

// import modules
import { AppModule } from "@/app.module";

// import services
import { ConfigService } from "@nestjs/config";

/**
 * Bootstrap the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get the instance of the config service
  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<number>("app.PORT")!, () => {
    const domain = configService.get<string>("app.DOMAIN");
    // if the environment is development, log the domain and port
    if (configService.get<string>("app.ENVIRONMENT") === "development") {
      const port = configService.get<number>("app.PORT");
      Logger.log(`Application is running on: ${domain}:${port}`);
    }
    // if the environment is production, log the domain
    else {
      Logger.log(`Application is running on: ${domain}`);
    }
  });
}

bootstrap().catch(() => {
  process.exit(1);
});
