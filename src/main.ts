// import dependencies
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

// import app module
import { AppModule } from "@/app.module";

// import services
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

// main entry point
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // build for swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Progress Tracker API")
    .setDescription("Progress Tracker Backend API Specification")
    .setVersion(configService.get<string>("app.API_VERSION")!)
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, documentFactory);

  // listen on port
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
