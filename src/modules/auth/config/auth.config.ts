// import dependencies
import { registerAs } from "@nestjs/config";
import validateConfig from "@common/utils/validate-config";

// import decorators
import { IsNotEmpty, IsString } from "class-validator";

// import auth configuration type
import { CONFIG_AUTH } from "@modules/auth/config/auth-config.type";

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export default registerAs<CONFIG_AUTH>("auth", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    JWT_SECRET: process.env.JWT_SECRET!,
  };
});
