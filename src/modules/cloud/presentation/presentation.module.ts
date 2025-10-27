// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { CloudController } from "./controllers/cloud.controller";
import { CloudApplicationModule } from "../application/application.module";

/**
 * Cloud presentation module
 * @description Cloud presentation module which provides the cloud presentation services
 */
@Module({
  controllers: [CloudController],
  imports: [CloudApplicationModule],
  exports: [],
})
export class CloudPresentationModule {}
