// import dependencies
import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

// import app module
import { AppModule } from "@/app.module";

// import services
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

// import pipes
import { ValidationPipe } from "@nestjs/common";
import { ValidationPipeOptions } from "@nestjs/common";

// import guards
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";

// main entry point
async function bootstrap() {
  // create app instance
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ["x-total-count"],
  });

  // get config service
  const configService = app.get(ConfigService);

  // set global prefix
  app.setGlobalPrefix(`api/${configService.get<string>("app.API_VERSION")!}`);

  // use jwt auth guard
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  // use validation pipe
  const validationPipeOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    // ignore fields that are not in the dto
    forbidNonWhitelisted: false,
  };
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

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
