// import dependencies
import { NestFactory } from "@nestjs/core";

// import app module
import { AppModule } from "@/app.module";

// import services
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

// main entry point
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>("app.PORT")!, () => {
    Logger.log(
      `Server is running on ${configService.get<string>("app.DOMAIN")!}:${configService.get<number>("app.PORT")!}`,
    );
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
