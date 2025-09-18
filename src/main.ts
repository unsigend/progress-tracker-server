// import dependencies
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import app module
import { AppModule } from './app.module';

// bootstrap function
async function bootstrap() {
  // create app instance
  const app: INestApplication = await NestFactory.create(AppModule);

  // create swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Progress Tracker API')
    .setDescription('Progress Tracker Backend API Specification')
    .setVersion('1.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setOpenAPIVersion('3.0.0')
    .build();

  // create swagger document
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  // listen on port
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
