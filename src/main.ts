// import dependencies
import { NestFactory } from '@nestjs/core';

// import modules
import { AppModule } from '@/app.module';

// import types
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  // create the application instance
  const app: INestApplication = await NestFactory.create(AppModule, {
    abortOnError: true,
  });

  // listen on the port
  await app.listen(process.env.PORT ?? 3001);
}

// bootstrap the application
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
