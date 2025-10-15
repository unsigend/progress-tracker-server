// import dependencies
import { registerAs } from "@nestjs/config";
import { IsString, IsNotEmpty } from "class-validator";

// import types
import { CONFIG_MAILER } from "@modules/mailer/config/mailer.config.type";

// import utils
import validateConfig from "@common/utils/validate-config";

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  RESEND_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  FROM_EMAIL: string;

  @IsString()
  @IsNotEmpty()
  FROM_NAME: string;
}

export default registerAs<CONFIG_MAILER>("mailer", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    FROM_EMAIL: process.env.FROM_EMAIL!,
    FROM_NAME: process.env.FROM_NAME!,
  };
});
