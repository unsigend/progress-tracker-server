// import dependencies
import { NestFactory } from "@nestjs/core";
import { Logger, BadRequestException } from "@nestjs/common";
import { Request, Response } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// import modules
import { AppModule } from "@/app.module";

// import services
import { ConfigService } from "@nestjs/config";

// import platform related components
import { ValidationPipe } from "@nestjs/common";
import { DomainExceptionFilter } from "@/platforms/filters/domain-exception.filter";
import { JwtAuthGuard } from "@/platforms/guards/jwt-auth.guard";
import { Reflector } from "@nestjs/core";

// import scalar for modern API documentation
import { apiReference } from "@scalar/nestjs-api-reference";

/**
 * Bootstrap the application
 */
async function bootstrap() {
  // create the nest application
  const applicationInstance = await NestFactory.create(AppModule);

  // get the instance of the config service
  const configService = applicationInstance.get<ConfigService>(ConfigService);

  // enable global validation pipe
  applicationInstance.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        // Get first error message
        const firstError = errors[0];
        const firstMessage = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : "Validation failed";

        // return the bad request exception
        return new BadRequestException(firstMessage);
      },
    }),
  );

  // use the JWT strategy for the protected routes
  applicationInstance.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  // set the global prefix
  const apiPrefix = configService.get<string>("app.API_PREFIX");
  const apiVersion = configService.get<string>("app.API_VERSION");
  applicationInstance.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

  // set the global filters
  applicationInstance.useGlobalFilters(new DomainExceptionFilter());

  // enable cors
  applicationInstance.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["x-total-count", "x-total-pages", "x-total-items"],
  });

  // configure the OpenAPI specification
  const config = new DocumentBuilder()
    .setTitle("Progress Tracker API")
    .setDescription("API documentation for the Progress Tracker application")
    .setVersion("1.0")
    .addBearerAuth()
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  // create the OpenAPI document
  const document = SwaggerModule.createDocument(applicationInstance, config);

  // setup Scalar API documentation UI
  applicationInstance.use(
    "/api-docs",
    apiReference({
      theme: "purple",
      darkMode: true,
      content: document,
      layout: "classic",
      hideModels: true,
    }),
  );

  // add JSON endpoint for swagger-typescript-api
  applicationInstance.use("/api-docs-json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(document);
  });

  // log the application is running
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

  // listen to the port
  await applicationInstance.listen(
    configService.get<number>("app.PORT") ?? 3000,
  );
}

bootstrap().catch(() => {
  process.exit(1);
});
