// import dependencies
import { registerAs } from "@nestjs/config";
import { AwsS3CloudConfigType } from "@/infrastructure/services/aws-s3-cloud/config/aws-s3-cloud-type.config";
import { validateConfig } from "@/platforms/utils/validate-config";

/**
 * AWS S3 Cloud configuration
 * @description AWS S3 Cloud configuration
 */
export default registerAs<AwsS3CloudConfigType>("awsS3CloudConfig", () => {
  validateConfig(AwsS3CloudConfigType, process.env);

  return {
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY!,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY!,
    AWS_S3_REGION: process.env.AWS_S3_REGION!,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME!,
  };
});
