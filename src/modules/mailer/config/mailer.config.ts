// import dependencies
import { registerAs } from "@nestjs/config";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

// import types
import { CONFIG_MAILER } from "@modules/mailer/config/mailer.config.type";

// import utils
import validateConfig from "@common/utils/validate-config";

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  @IsNotEmpty()
  SMTP_USER: string;

  @IsString()
  @IsNotEmpty()
  SMTP_PASS: string;

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
    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: parseInt(process.env.SMTP_PORT!, 10),
    SMTP_USER: process.env.SMTP_USER!,
    SMTP_PASS: process.env.SMTP_PASS!,
    FROM_EMAIL: process.env.FROM_EMAIL!,
    FROM_NAME: process.env.FROM_NAME!,
  };
});
