// import dependencies
import { Module } from "@nestjs/common";

// import tokens
import { MAILER_TOKEN } from "@shared/domain/services/mailer.service";
import { IMAGE_COMPRESSOR_TOKEN } from "@shared/domain/services/image-compress.service";

// import services
import { ResendMailerService } from "./resend-mailer/resend-mailer.service";
import { ImageCompressService } from "./image-compress/image-compress.service";

/**
 * Services module
 * @description Services module which provides the services
 */
@Module({
  providers: [
    {
      provide: MAILER_TOKEN,
      useClass: ResendMailerService,
    },
    {
      provide: IMAGE_COMPRESSOR_TOKEN,
      useClass: ImageCompressService,
    },
  ],
  exports: [MAILER_TOKEN, IMAGE_COMPRESSOR_TOKEN],
})
export class ServicesModule {}
