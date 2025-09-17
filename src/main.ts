// import dependencies
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

// import app module
import { AppModule } from "@/app.module";

// import pipes
import { ValidationPipe } from "@nestjs/common";

// import types
import { INestApplication } from "@nestjs/common";

// import third party modules
import cookieParser from "cookie-parser";

async function bootstrap() {
  // create app instance
  const app: INestApplication = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  // use cookie parser
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // enable features of the app
  app.setGlobalPrefix("api/v1");

  // use validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // create swagger options
  const swaggerOptions = new DocumentBuilder()
    .setTitle("Progress Tracker API")
    .setDescription("Progress Tracker Backend API Specification")
    .setVersion("1.0")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  // create swagger document
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api-docs", app, swaggerDocument);

  // listen on port
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
