// import dependencies
import { registerAs } from "@nestjs/config";
import validateConfig from "@common/utils/validate-config";

// import decorators
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  IsEnum,
} from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

// import app configuration type
import { CONFIG_APP } from "@modules/config/app-config.type";

class EnvironmentVariablesValidator {
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  DOMAIN: string;

  @IsEnum(Environment)
  @IsOptional()
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  API_VERSION: string;
}

export default registerAs<CONFIG_APP>("app", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    DOMAIN: process.env.DOMAIN ?? "http://localhost",
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    NODE_ENV: process.env.NODE_ENV ?? Environment.Development,
    API_VERSION: process.env.API_VERSION ?? "1.0",
  };
});
