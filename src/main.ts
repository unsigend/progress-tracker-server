// import dependencies
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "@/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { ValidationPipe } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { DomainExceptionFilter } from "@shared/platforms/filters/domain-exception.filter";

// import types
import { AppConfigType } from "@shared/platforms/config/app.config.type";
import { INestApplication } from "@nestjs/common";
import { Request, Response } from "express";
import { OpenAPIObject } from "@nestjs/swagger";

/**
 * Setup the application configuration
 * @description Setup the application configuration
 * @param appInstance - The application instance
 * @param appConfig - The application configuration
 * @returns The application instance
 */
function setupConfig(
  appInstance: INestApplication,
  appConfig: AppConfigType,
): INestApplication {
  // set the global prefix
  const globalPrefix: string = `api/v${appConfig.APP_API_VERSION}`;
  appInstance.setGlobalPrefix(globalPrefix);

  // enable CORS
  appInstance.enableCors({
    origin: [appConfig.APP_FRONTEND_URL, appConfig.APP_BACKEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["x-total-count", "x-total-pages", "x-total-items"],
  });

  // return the application instance
  return appInstance;
}

/**
 * Setup the OpenAPI documentation
 * @description Setup the OpenAPI documentation
 * @param appInstance - The application instance
 * @param appConfig - The application configuration
 * @returns The application instance
 */
function setupOpenAPIDocs(
  appInstance: INestApplication,
  appConfig: AppConfigType,
): INestApplication {
  // configure the OpenAPI specification
  const openAPISpecification = new DocumentBuilder()
    .setTitle(`${appConfig.APP_NAME} API`)
    .setDescription(
      `API documentation for the ${appConfig.APP_NAME} application`,
    )
    .setVersion(`v${appConfig.APP_API_VERSION}`)
    .addBearerAuth()
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  // create the OpenAPI document
  const document: OpenAPIObject = SwaggerModule.createDocument(
    appInstance,
    openAPISpecification,
  );

  // setup Scalar documentation web UI
  appInstance.use(
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
  appInstance.use("/api-docs-json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(document);
  });

  // return the application instance
  return appInstance;
}

/**
 * Setup the platform related components
 * @description Setup the platform related components
 * @param appInstance - The application instance
 * @returns The application instance
 */
function setupComponents(appInstance: INestApplication): INestApplication {
  // enable class-validator validation pipe
  appInstance.useGlobalPipes(
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

  // enable the domain exception filter
  appInstance.useGlobalFilters(new DomainExceptionFilter());

  // return the application instance
  return appInstance;
}

/**
 * Bootstrap the application
 * @description Bootstrap the application
 */
async function bootstrap() {
  // create the application instance
  const appInstance: INestApplication = await NestFactory.create(AppModule);

  // get the application configuration
  const configService = appInstance.get(ConfigService);
  const appConfig: AppConfigType = configService.get<AppConfigType>("app")!;

  // setup the application configuration
  setupConfig(appInstance, appConfig);

  // setup the platform related components
  setupComponents(appInstance);

  // setup the OpenAPI documentation
  setupOpenAPIDocs(appInstance, appConfig);

  // start the application
  await appInstance.listen(appConfig.APP_PORT);
}

bootstrap().catch((error) => {
  Logger.error(`Error starting the application: ${error}`);
  process.exit(1);
});
