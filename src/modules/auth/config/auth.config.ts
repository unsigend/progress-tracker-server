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
}

export default registerAs<CONFIG_AUTH>("auth", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "7d",
  };
});
