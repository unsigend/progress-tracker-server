// import dependencies
import { registerAs } from "@nestjs/config";
import validateConfig from "@common/utils/validate-config";

// import decorators
import { IsNotEmpty, IsString } from "class-validator";

// import S3 configuration type
import { CONFIG_S3 } from "@modules/S3/config/S3.config.type";

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  AWS_S3_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET_NAME: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_SECRET_KEY: string;
}

export default registerAs<CONFIG_S3>("s3", () => {
  validateConfig(EnvironmentVariablesValidator, process.env);

  return {
    AWS_S3_REGION: process.env.AWS_S3_REGION!,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME!,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY!,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY!,
  };
});
