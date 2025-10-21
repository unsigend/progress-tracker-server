// import dependencies
import { registerAs } from "@nestjs/config";
import { JwtTokenConfigType } from "@/infrastructure/services/jwt-token/config/jwt-token-type.config";
import { validateConfig } from "@/platforms/utils/validate-config";

/**
 * JWT token configuration
 * @description JWT token configuration
 */
export default registerAs<JwtTokenConfigType>("jwtToken", () => {
  validateConfig(JwtTokenConfigType, process.env);

  return {
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
    JWT_ACCESS_TOKEN_EXPIRATION_TIME:
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME!,
    JWT_REFRESH_TOKEN_EXPIRATION_TIME:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME!,
  };
});
