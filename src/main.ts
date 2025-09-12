// import dependencies
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

// import modules
import { AppModule } from "@/app.module";

// import types
import { INestApplication } from "@nestjs/common";

// bootstrap function
async function bootstrap() {
  // create app instance
  const app: INestApplication = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  // create swagger options
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Progress Tracker Backend API Specification")
    .setDescription("Progress Tracker Backend API Specification")
    .setVersion("1.0")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  // create swagger document
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, swaggerDocument);

  // listen on port
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
