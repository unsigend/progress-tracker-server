// import dependencies
import { registerAs } from "@nestjs/config";
import { AppConfigType } from "@/platforms/config/app-type.config";
import { validateConfig } from "@/platforms/utils/validate-config";

/**
 * App Configuration
 * @description App Configuration
 */
export default registerAs<AppConfigType>("app", () => {
  validateConfig(AppConfigType, process.env);

  return {
    ENVIRONMENT: process.env.ENVIRONMENT! as "development" | "production",
    DOMAIN: process.env.DOMAIN!,
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    API_PREFIX: process.env.API_PREFIX!,
    API_VERSION: process.env.API_VERSION!,
  };
});
