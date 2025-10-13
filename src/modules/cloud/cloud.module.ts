// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { S3Module } from "@modules/S3/S3.module";
import { ImagesModule } from "@modules/images/images.module";

// import services
import { S3Service } from "@modules/S3/S3.service";
import { ImagesService } from "@modules/images/images.service";

// import controllers
import { CloudController } from "@/modules/cloud/cloud.controller";

@Module({
  imports: [S3Module, ImagesModule],
  providers: [S3Service, ImagesService],
  controllers: [CloudController],
})
export class CloudModule {}
