/* eslint-disable @typescript-eslint/no-unsafe-call */
// import dependencies
import { registerAs } from "@nestjs/config";
import validateConfig from "@common/utils/validate-config";

// import decorators
import { IsNotEmpty, IsString } from "class-validator";

// import database configuration type
import { CONFIG_DATABASE } from "@modules/database/config/database-config.type";

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

export default registerAs<CONFIG_DATABASE>("database", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
  };
});
