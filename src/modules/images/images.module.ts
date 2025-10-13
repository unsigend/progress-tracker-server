// import dependencies
import { Module } from "@nestjs/common";

// import services
import { ImagesService } from "@modules/images/images.service";

@Module({
  providers: [ImagesService],
  controllers: [],
  exports: [ImagesService],
})
export class ImagesModule {}
