// import dependencies
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

// import modules
import { AppModule } from "@/app.module";

// import services
import { ConfigService } from "@nestjs/config";

// import platform related components
import { DomainExceptionFilter } from "@/platforms/filters/domain-exception.filter";

/**
 * Bootstrap the application
 */
async function bootstrap() {
  // create the nest application
  const applicationInstance = await NestFactory.create(AppModule);

  // get the instance of the config service
  const configService = applicationInstance.get<ConfigService>(ConfigService);

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

  // configure the swagger options
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Progress Tracker API Documentation")
    .setDescription("API documentation for the Progress Tracker application")
    .setVersion("1.0")
    .addBearerAuth()
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  // create the swagger document
  const document = SwaggerModule.createDocument(
    applicationInstance,
    swaggerConfig,
  );
  SwaggerModule.setup("api-docs", applicationInstance, document);

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
  await applicationInstance.listen(3000);
}

bootstrap().catch(() => {
  process.exit(1);
});
