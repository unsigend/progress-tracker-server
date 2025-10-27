// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * AWS S3 Cloud configuration type
 * @description AWS S3 Cloud configuration type
 */
export class AwsS3CloudConfigType {
  @IsString()
  @IsNotEmpty()
  AWS_S3_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET_NAME: string;
}
