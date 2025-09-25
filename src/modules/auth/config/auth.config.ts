// import dependencies
import { registerAs } from "@nestjs/config";
import validateConfig from "@common/utils/validate-config";

// import decorators
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

// import auth configuration type
import { CONFIG_AUTH } from "@modules/auth/config/auth-config.type";

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  GOOGLE_FRONTEND_REDIRECT_URL: string;

  @IsString()
  @IsNotEmpty()
  GITHUB_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GITHUB_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  GITHUB_FRONTEND_REDIRECT_URL: string;
}

export default registerAs<CONFIG_AUTH>("auth", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "7d",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_FRONTEND_REDIRECT_URL:
      process.env.GOOGLE_FRONTEND_REDIRECT_URL ??
      `${process.env.FRONTEND_URL}/auth/google/callback`,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    GITHUB_FRONTEND_REDIRECT_URL:
      process.env.GITHUB_FRONTEND_REDIRECT_URL ??
      `${process.env.FRONTEND_URL}/auth/github/callback`,
  };
});
