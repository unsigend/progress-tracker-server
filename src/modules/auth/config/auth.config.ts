import { registerAs } from "@nestjs/config";
import { AuthConfigType } from "@modules/auth/config/auth.config.type";
import { validateConfig } from "@shared/platforms/util/validate-config";

/**
 * Auth configuration
 * @description Auth configuration
 */
export default registerAs<AuthConfigType>("auth", () => {
  validateConfig(AuthConfigType, process.env);

  return {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    GITHUB_FRONTEND_CALLBACK_POSTFIX:
      process.env.GITHUB_FRONTEND_CALLBACK_POSTFIX!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_FRONTEND_CALLBACK_POSTFIX:
      process.env.GOOGLE_FRONTEND_CALLBACK_POSTFIX!,
  };
});
