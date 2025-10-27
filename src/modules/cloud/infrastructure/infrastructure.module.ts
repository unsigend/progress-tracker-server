// import dependencies
import { Module } from "@nestjs/common";

import { CLOUD_TOKEN } from "../domain/cloud.service";
import { AwsS3CloudService } from "./aws-s3-cloud/aws-s3-cloud.service";

/**
 * Cloud infrastructure module
 * @description Cloud infrastructure module which provides the cloud infrastructure services
 */
@Module({
  imports: [],
  providers: [
    {
      provide: CLOUD_TOKEN,
      useClass: AwsS3CloudService,
    },
  ],
  exports: [CLOUD_TOKEN],
})
export class CloudInfrastructureModule {}
