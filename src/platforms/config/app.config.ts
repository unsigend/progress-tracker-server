// import dependencies
import { registerAs } from "@nestjs/config";
import { validateConfig } from "@/platforms/util/validate-config";

// import types
import { AppConfigType, AppEnvironment } from "./app.config.type";

/**
 * Application configuration
 * @description Application configuration
 */
export default registerAs<AppConfigType>("app", (): AppConfigType => {
  validateConfig(AppConfigType, process.env);

  return {
    APP_PORT: parseInt(process.env.APP_PORT!),
    APP_NAME: process.env.APP_NAME!,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT as AppEnvironment,
    APP_API_VERSION: process.env.APP_API_VERSION!,
    APP_BACKEND_URL: process.env.APP_BACKEND_URL!,
    APP_FRONTEND_URL: process.env.APP_FRONTEND_URL!,
  };
});
