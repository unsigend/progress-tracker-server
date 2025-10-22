// import dependencies
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

// import services
import { BcryptPasswordHasherService } from "@/infrastructure/services/bcrypt-password-hasher/bcrypt-password-hasher.service";
import { JwtTokenService } from "@/infrastructure/services/jwt-token/jwt-token.service";
import { AwsS3CloudService } from "@/infrastructure/services/aws-s3-cloud/aws-s3-cloud.service";
import { ResendMailerService } from "@/infrastructure/services/resend-mailer/resend-mailer.service";
import { ImageCompressService } from "@/infrastructure/services/image-compress/image-compress.service";

// import tokens
import { PASSWORD_HASHER_TOKEN } from "@domain/services/password-hasher.interface";
import { TOKEN_SERVICE_TOKEN } from "@domain/services/token.interface";
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";
import { MAILER_TOKEN } from "@domain/services/mailer.interface";
import { IMAGE_COMPRESSOR_TOKEN } from "@domain/services/image-compress.interface";

/**
 * Services module
 * @description Services module
 */
@Module({
  imports: [JwtModule],
  providers: [
    {
      provide: PASSWORD_HASHER_TOKEN,
      useClass: BcryptPasswordHasherService,
    },
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: JwtTokenService,
    },
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
  exports: [
    PASSWORD_HASHER_TOKEN,
    TOKEN_SERVICE_TOKEN,
    CLOUD_TOKEN,
    MAILER_TOKEN,
    IMAGE_COMPRESSOR_TOKEN,
  ],
})
export class ServicesModule {}
