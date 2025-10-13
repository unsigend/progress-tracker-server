// import dependencies
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// import services
import { S3Service } from "@modules/S3/S3.service";

@Module({
  imports: [ConfigModule],
  providers: [S3Service],
  exports: [S3Service],
  controllers: [],
})
export class S3Module {}
