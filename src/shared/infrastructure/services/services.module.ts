// import dependencies
import { Module } from "@nestjs/common";

// import tokens
import { CLOUD_TOKEN } from "@shared/domain/services/cloud.service";
import { MAILER_TOKEN } from "@shared/domain/services/mailer.service";
import { IMAGE_COMPRESSOR_TOKEN } from "@shared/domain/services/image-compress.service";

// import services
import { AwsS3CloudService } from "./aws-s3-cloud/aws-s3-cloud.service";
import { ResendMailerService } from "./resend-mailer/resend-mailer.service";
import { ImageCompressService } from "./image-compress/image-compress.service";

/**
 * Services module
 * @description Services module which provides the services
 */
@Module({
  providers: [
    {
      provide: CLOUD_TOKEN,
      useClass: AwsS3CloudService,
    },
    {
      provide: MAILER_TOKEN,
      useClass: ResendMailerService,
    },
    {
      provide: IMAGE_COMPRESSOR_TOKEN,
      useClass: ImageCompressService,
    },
  ],
  exports: [CLOUD_TOKEN, MAILER_TOKEN, IMAGE_COMPRESSOR_TOKEN],
})
export class ServicesModule {}
