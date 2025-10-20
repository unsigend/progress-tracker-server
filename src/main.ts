// import dependencies
import { NestFactory } from "@nestjs/core";

// import modules
import { AppModule } from "@/app.module";

/**
 * Bootstrap the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(() => {
  process.exit(1);
});
